require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/author_generator.rb'
require 'date' 


class TestFilters
  include Jekyll::Filters

  def initialize()
    @context = DummyAuthorGeneratorConfig.new
  end

end 

class DummyAuthorGeneratorConfig
  attr_reader :config

  def registers
    {:site => self}
  end  

  def config
    { 
      'author_dir' => 'author_dir', 
      'baseurl' => 'baseurl' 
    }
  end  
end

describe "Generate Author" do

  it 'fails to generate if no author index' do
    site = double 
    allow(site).to receive(:config).and_return({})
    allow(site).to receive(:layouts).and_return({'no_author_index' => nil})
    genAuthor = Jekyll::GenerateAuthor.new   
    expect{genAuthor.generate(site)}.to raise_exception(UncaughtThrowError, /uncaught throw "No 'author_index' layout found."/)
  end  

  it 'GenerateAuthor does not calls write_author_indexes if there are no posts and no collections' do
    site = double 
    allow(site).to receive(:layouts).and_return({'author_index' => 42})
    allow(site).to receive(:config).and_return({'no_author_dir' => 'no_authors'})
  
    posts = double
    collection_docs = double
    allow(site).to receive(:posts).and_return(posts)
    allow(posts).to receive(:docs).and_return([])
    
    allow(site).to receive(:collections).and_return( {'videos' => collection_docs})

    allow(collection_docs).to receive(:docs).and_return([])
    
    author_index_writer = double

    allow(Jekyll::AuthorIndexWriter).to receive(:new).and_return(author_index_writer)

    genAuthor = Jekyll::GenerateAuthor.new       
    genAuthor.generate(site)

    expect(author_index_writer).to receive(:write_author_index).exactly(0).times()
  end

  it 'GenerateAuthor calls write write_author_indexes with one author from each' do
    site = double 
    allow(site).to receive(:layouts).and_return({'author_index' => 42})
    allow(site).to receive(:config).and_return({'no_author_dir' => 'no_authors'})
  
    posts = double
    collection_docs = double
    allow(site).to receive(:posts).and_return(posts)

    author_record = double

    allow(posts).to receive(:docs).and_return([ author_record ])

    allow(author_record).to receive(:data).and_return( {'author' => 'A.A. Aaardvark'} )
    
    allow(site).to receive(:collections).and_return( {'videos' => collection_docs})

    video_docs = double
    allow(video_docs).to receive(:data).and_return( {'author' => 'B B Barracuda'} ) 

    allow(collection_docs).to receive(:docs).and_return( [video_docs] )
  
    allow(site).to receive(:source).and_return("source/")
    allow(site).to receive(:site_payload).and_return("payload")

    author_index_writer = double

    expect(author_index_writer).to receive(:write_author_index).with("A.A. Aaardvark")
    expect(author_index_writer).to receive(:write_author_index).with("B B Barracuda")

    
    allow(Jekyll::AuthorIndexWriter).to receive(:new).and_return(author_index_writer)

    genAuthor = Jekyll::GenerateAuthor.new   
    genAuthor.generate(site) 
  end  
end

describe 'AuthorIndexWriter' do

  it 'Write an author works without author_dir, only called once' do
    site = double

    allow(site).to receive(:config).and_return({'foo' => 'bar'})
    allow(site).to receive(:source).and_return('./source')
    allow(site).to receive(:layouts).and_return('layouts')
    allow(site).to receive(:site_payload).and_return('site_payload')
    allow(site).to receive(:dest).and_return('./dest')

    author_index = double

    allow(Jekyll::AuthorIndex).to receive(:new).with(site, './source', 'authors/jkr', 'JKR').and_return(author_index).once

    expect(author_index).to receive(:render).with('layouts', 'site_payload')
    expect(author_index).to receive(:write).with('./dest')

    pages = double

    expect(site).to receive(:pages).and_return(pages)

    expect(pages).to receive(:<<).once

    subject = Jekyll::AuthorIndexWriter.new site 
    subject.write_author_index("JKR")
    subject.write_author_index("JKR")
  end  

end  

describe 'AuthorGenerator' do
  let(:subject) { TestFilters.new }

  describe 'author_url works for Harry Potter' do
     it 'checks path build and name lowercased and hypenated' do
      expect(subject.author_url("Harry Potter")).to eq('baseurl/author_dir/harry-potter/')
     end 
  end

  describe 'AuthorNameToPath lowercases and hyphenates' do
    it 'can handle Harry Potter' do
      expect( Jekyll::AuthorNameToPath.parse("Harry Potter")).to eq('harry-potter')
    end
  end  

  describe 'date_transform' do
    it 'correctly formats date' do
      date = Date::parse('1980-07-31')
      expect(subject.date_to_html_string(date)).to eq('<span class="month">JUL</span> <span class="day">31</span> <span class="year">1980</span> ') 
    end
  end

  describe 'author_links' do
    it 'handles a null item' do
      expect(subject.author_links(nil)).to eq("")
    end

    it 'handles an empty string' do
      expect(subject.author_links("")).to eq("")
    end

    it 'handles array of an empty string' do
      expect(subject.author_links([""])).to eq("")
    end

    it 'handles a single element list' do
      expect(subject.author_links('Harry Potter')).to eq("<a class='author' href='baseurl/author_dir/harry-potter/'>Harry Potter</a>")
    end

    it 'handles element list' do
      expect(subject.author_links(['Harry Potter', 'Ron Weasley'])).to eq("<a class='author' href='baseurl/author_dir/harry-potter/'>Harry Potter</a>, <a class='author' href='baseurl/author_dir/ron-weasley/'>Ron Weasley</a>")
    end

    it 'handles element list with empty element' do
      expect(subject.author_links(['Harry Potter', '', 'Ron Weasley'])).to eq("<a class='author' href='baseurl/author_dir/harry-potter/'>Harry Potter</a>, <a class='author' href='baseurl/author_dir/ron-weasley/'>Ron Weasley</a>")
    end
  end

end
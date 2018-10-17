require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/author_generator.rb'
require 'date' 


class TestFilters
  include Jekyll::Filters

  def initialize()
    @context = DummyConfig.new
  end

end 

class DummyConfig
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
  
  describe "Generate Authors" do
    
    it 'Generate calls write_author_indexes' do
      site = double  
      expect(site).to receive :write_author_indexes
      
      genAuthor = Jekyll::GenerateAuthor.new
      genAuthor.generate(site)
    end

  end
  
end
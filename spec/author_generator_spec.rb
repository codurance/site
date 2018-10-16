require 'jekyll'
require 'jekyll/tagging'
require_relative '../src/_plugins/author_generator.rb'
require 'date' 

class TestFilters
  include Jekyll::Filters
end 

class Config
  attr_reader :config

  def self.create
    @config = {'author_dir' => 'basedir', 'baseurl' => 'baseurl'}
  end   

end

# This is a horrible way to mock things, looking for a better solution.
def method_missing(m, *args, &block)
  
  if (m == 'registers')
    return {:site => Config.new }
  end  
  
end  


describe 'AuthorGenerator' do

  let(:subject) { TestFilters.new }

  describe 'author_url works for Harry Potter' do
     it 'checks path build and name lowercased and hypenated' do
       expect(subject.author_url("Harry Potter")).to eq('/authors/harry-potter/')
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
      expect(subject.author_links('Harry Potter')).to eq("<a class='author' href='/authors/harry-potter/'>Harry Potter</a>")
    end

    it 'handles element list' do
      expect(subject.author_links(['Harry Potter', 'Ron Weasley'])).to eq("<a class='author' href='/authors/harry-potter/'>Harry Potter</a>, <a class='author' href='/authors/ron-weasley/'>Ron Weasley</a>")
    end

    it 'handles element list with empty element' do
      expect(subject.author_links(['Harry Potter', '', 'Ron Weasley'])).to eq("<a class='author' href='/authors/harry-potter/'>Harry Potter</a>, <a class='author' href='/authors/ron-weasley/'>Ron Weasley</a>")
    end

  end  

end
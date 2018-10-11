require 'jekyll'
require 'jekyll/tagging'
require_relative '../src/_plugins/author_generator.rb'
require 'test/unit'
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

def method_missing(m, *args, &block)
  
  if (m == 'registers')
    return {:site => Config.new }
  end  
  
end  


describe "AuthorGenerator" do

  let(:subject) { TestFilters.new }

  describe 'author_url works for Harry Potter' do
     it 'checks path build and name lowercased and hypenated' do
       expect(subject.author_url("Harry Potter")).to eq('/authors/harry-potter/')
     end 
  end


  describe 'date_transform' do
    it 'correctly formats date' do
      date = Date::parse('1980-07-31')
      expect(subject.date_to_html_string(date)).to eq('<span class="month">JUL</span> <span class="day">31</span> <span class="year">1980</span> ') 
    end
  end

end
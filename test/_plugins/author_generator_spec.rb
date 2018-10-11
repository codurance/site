require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/author_generator.rb'
require 'test/unit'
require 'date' 

class TestAuthorGenerator < Test::Unit::TestCase
  include Jekyll::Filters

  def setup
    @context    
  end  

  def test_AuthorNameToPath 
    assert_equal("chris-eyre", Jekyll::AuthorNameToPath::parse("Chris Eyre"))
  end
  
  def test_date_transform
  def test_date_transform
    date = Date::parse('1980-07-31')
    assert_equal('<span class="month">JUL</span> <span class="day">31</span> <span class="year">1980</span> ', 
        date_to_html_string(date))
  end

end

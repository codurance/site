require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/image_helper.rb'

class DummyImageContext
  attr_reader :config

  def registers
    {:site => self}
  end  

  def config
    { 
      'baseurl' => 'baseurl',
    }
  end  
end

module Jekyll
    class ImageTag < Liquid::Tag
       attr_accessor :context    
    end    
end    
  

describe 'ImageTag' do

    it 'Can render a simple image with alt text' do
      token = double
      expect(token).to receive :line_number

      tag = Jekyll::ImageTag.send :new, 'img', '/assets/custom/img/blog/ncraft-2017/event-storming-with-brandolini.jpg "ALT"', token

      context = DummyImageContext.new  

      expect(tag.render(context)).to eq('<p></p><img src="baseurl/assets/custom/img/blog/ncraft-2017/event-storming-with-brandolini.jpg"  alt="ALT" title="ALT" class="img img-center img-fluid style-screengrab">')
    end

    it 'Leaves non-relative images alone' do
        token = double
        expect(token).to receive :line_number
  
        tag = Jekyll::ImageTag.send :new, 'img', 'http://www.randomkittengenerator.com/cats/rotator.php "ALT"', token
  
        expect(tag.render(nil)).to eq('<p></p><img src="http://www.randomkittengenerator.com/cats/rotator.php"  alt="ALT" title="ALT" class="img img-center img-fluid style-screengrab">')
        
    end    
    
    it 'will throw an exception when an img has an empty alt tag' do
        token = double
        expect(token).to receive :line_number
  
        tag = Jekyll::ImageTag.send :new, 'img', 'baseurl/a-real-image.jpg ""', token
        context = DummyImageContext.new  
    
        expect{tag.render(context)}.to raise_error "Missing alt text: please describe the image for a blind user"
    end

    it 'will throw an exception when an img is missing an alt tag' do
        token = double
        expect(token).to receive :line_number
  
        tag = Jekyll::ImageTag.send :new, 'img', 'baseurl/a-real-image.jpg', token
        context = DummyImageContext.new  
    
        expect{tag.render(context)}.to raise_error "Missing alt text: please describe the image for a blind user"
    end

end    
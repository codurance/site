require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/image_helper.rb'

describe 'ImageTag' do

    it 'Can render a simple image with alt text' do
      token = double
      expect(token).to receive :line_number

      tag = Jekyll::ImageTag.send :new, 'img', '/assets/custom/img/blog/ncraft-2017/event-storming-with-brandolini.jpg "ALT"', token

      expect(tag.render(nil)).to eq('<p></p><img src="/assets/custom/img/blog/ncraft-2017/event-storming-with-brandolini.jpg"  alt="ALT" title="ALT" class="img img-center img-fluid style-screengrab">')
    end
    
    it 'will throw an exception when an img does not have a non-blank alt tag' do
        token = double
        expect(token).to receive :line_number
  
        tag = Jekyll::ImageTag.send :new, 'img', '/a-real-image.jpg ""', token
    
        expect{tag.render(nil)}.to raise_error "Missing alt text: please describe the image for a blind user"
    end

    it 'will throw an exception when an img is missing an alt tag' do
        token = double
        expect(token).to receive :line_number
  
        tag = Jekyll::ImageTag.send :new, 'img', '/a-real-image.jpg', token
    
        expect{tag.render(nil)}.to raise_error "Missing alt text: please describe the image for a blind user"
    end

end    
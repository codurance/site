# Source is https://gist.github.com/pichfl/1548864
# A simple plugin for Jekyll that allows you to use {% img url "alt text" %} to add images to your posts.
# It will automatically check those images for width and height.
# 

require 'open-uri'

module Jekyll

  class ImageTag < Liquid::Tag
    @img = nil
    @alt = ""

    def initialize(tag_name, markup, tokens)
      @img = markup.strip
      if temp = @img.match(/^(.*)(\s)(\")(.*)(\")$/)
        @img = temp[1]
        @alt = temp[4]
      end
      
      super
    end

    def render(context)
      if @img
        "<p></p><img src=\"#{@img}\"  alt=\"#{@alt}\" title=\"#{@alt}\" class=\"img img-center img-responsive style-screengrab\">"
      end
      
    end
  end
end

Liquid::Template.register_tag('img', Jekyll::ImageTag)

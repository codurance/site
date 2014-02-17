require 'builder'
require 'liquid'

module Jekyll
  module Navigation
    class LinkTag < ::Liquid::Tag
      def initialize tag_name, markup, tokens
        super
        @name, @url = markup.split(/ @ /)
        @name.strip!
        @url.strip!
      end

      def render context
        page_title = context['page']['title']
        link_attributes = page_title == @name ? {'class' => 'btn-u btn-u-orange'} : {}

        output = Builder::XmlMarkup.new
        output.li { |li|
          li.a @name, {'href' => @url}.merge(link_attributes)
        }
      end
    end

    class SubLinkTag < ::Liquid::Tag
      def initialize tag_name, markup, tokens
        super
        @name, @url = markup.split(/ @ /)
        @name.strip!
        @url.strip!
      end

      def render context
        page_title = context['page']['title']
        list_item_attributes = page_title == @name ? {'class' => 'active'} : {}

        output = Builder::XmlMarkup.new
        output.li(list_item_attributes) { |li|
          li.a @name, 'href' => @url
        }
      end
    end

  private

    def current_page? name
      page_title = @context['page']['title']
      page_title == name
    end
  end
end

Liquid::Template.register_tag('nav_link', Jekyll::Navigation::LinkTag)
Liquid::Template.register_tag('nav_sublink', Jekyll::Navigation::SubLinkTag)

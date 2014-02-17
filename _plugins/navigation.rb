require 'builder'
require 'liquid'

module Jekyll
  module Navigation
    class LinkTag < ::Liquid::Tag
      def initialize tag_name, markup, tokens
        super
        @name, @url = ::Jekyll::Navigation::parse_link_from markup
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
        @name, @url = ::Jekyll::Navigation::parse_link_from markup
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

    class LinkGroupBlock < ::Liquid::Block
      def initialize tag_name, markup, tokens
        super
        @name = markup.strip
      end

      def render context
        page_group_title = context['page']['group']
        list_item_attributes = page_group_title == @name ? {'class' => 'dropdown active'} : {'class' => 'dropdown'}

        contents = super

        output = Builder::XmlMarkup.new
        output.li(list_item_attributes) { |li|
          li.a('class' => 'dropdown-toggle', 'data-hover' => 'dropdown', 'data-delay' => '0', 'data-close-others' => 'false') { |a|
            a.text!(@name + ' ')
            a.i('class' => 'icon-angle-down') { |i|
              i << '&nbsp;'
            }
          }
          li.ul('class' => 'dropdown-menu') { |ul|
            ul << contents
          }
        }
      end
    end

    def self.parse_link_from markup
      name, url = markup.split(/ @ /)
      [name.strip, url.strip]
    end
  end
end

Liquid::Template.register_tag('navlink', Jekyll::Navigation::LinkTag)
Liquid::Template.register_tag('navsublink', Jekyll::Navigation::SubLinkTag)
Liquid::Template.register_tag('navgroup', Jekyll::Navigation::LinkGroupBlock)

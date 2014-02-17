require 'builder'
require 'liquid'

module Jekyll
  module Navigation
    def nav_link name, url
      output = Builder::XmlMarkup.new
      output.li('class' => 'dropdown') { |li|
        li.a name, 'href' => url, 'class' => (current_page?(name) ? 'btn-u btn-u-orange' : '')
      }
    end

    def nav_sublink name, url
      output = Builder::XmlMarkup.new
      output.li(current_page?(name) ? {'class' => 'active'} : {}) { |li|
        li.a name, 'href' => url
      }
    end

  private

    def current_page? name
      page_title = @context['page']['title']
      page_title == name
    end
  end
end

Liquid::Template.register_filter(Jekyll::Navigation)

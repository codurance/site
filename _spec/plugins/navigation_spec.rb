require 'liquid'
require 'test_xml/spec'

require './_plugins/navigation.rb'

describe Jekyll::Navigation::LinkTag do
  it 'renders a link inside a list item' do
    rendering('{% navlink Over There @ /link/to/that/thing %}', 'page' => {})
      .should == '<li><a href="/link/to/that/thing">Over There</a></li>'
  end

  it 'renders an active link when on the page being linked' do
    rendering('{% navlink It\'s me! @ /hello/there %}', 'page' => {'title' => 'It\'s me!'})
      .should == '<li class="active"><a href="/hello/there">It\'s me!</a></li>'
  end
end

describe Jekyll::Navigation::LinkGroupBlock do
  it 'renders a list of items with the appropriate classes' do
    rendering(<<-TEMPLATE, 'page' => {})
      {% navgroup There\'s some links under here %}
        {% navlink One @ /group/1 %}
        {% navlink Two @ /group/2 %}
        {% navlink Three @ /group/3 %}
        {% navlink Four @ /group/4 %}
      {% endnavgroup %}
    TEMPLATE
      .should equal_xml(<<-XML)
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown">
            There's some links under here
            <i class="icon-angle-down">&nbsp;</i>
          </a>
          <ul class="dropdown-menu">
            <li><a href="/group/1">One</a></li>
            <li><a href="/group/2">Two</a></li>
            <li><a href="/group/3">Three</a></li>
            <li><a href="/group/4">Four</a></li>
          </ul>
        </li>
      XML
  end

  it 'renders an active link when on a page in the group' do
    rendering(<<-TEMPLATE, 'page' => {'group' => 'Notable Cryptographers', 'title' => 'Alice'})
      {% navgroup Notable Cryptographers %}
        {% navlink Alice @ /crypto/alice %}
        {% navlink Bob @ /crypto/bob %}
      {% endnavgroup %}
    TEMPLATE
      .should equal_xml(<<-XML)
        <li class="dropdown active">
          <a class="dropdown-toggle" data-toggle="dropdown">
            Notable Cryptographers
            <i class="icon-angle-down">&nbsp;</i>
          </a>
          <ul class="dropdown-menu">
            <li class="active"><a href="/crypto/alice">Alice</a></li>
            <li><a href="/crypto/bob">Bob</a></li>
          </ul>
        </li>
      XML
  end
end

private

def rendering template, parameters = {}
  Liquid::Template.parse(template).render(parameters)
end

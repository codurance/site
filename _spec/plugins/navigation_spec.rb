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
      .should == '<li><a href="/hello/there" class="btn-u btn-u-orange">It\'s me!</a></li>'
  end
end

describe Jekyll::Navigation::SubLinkTag do
  it 'renders a link inside a list item' do
    rendering('{% navsublink Look at me @ /subpage/one %}', 'page' => {})
      .should == '<li><a href="/subpage/one">Look at me</a></li>'
  end

  it 'renders an active link when on the page being linked' do
    rendering('{% navsublink You got me @ /subpage/two %}', 'page' => {'title' => 'You got me'})
      .should == '<li class="active"><a href="/subpage/two">You got me</a></li>'
  end
end

describe Jekyll::Navigation::LinkGroupBlock do
  it 'renders a list of items with the appropriate classes' do
    rendering(<<-TEMPLATE, 'page' => {})
      {% navgroup There\'s some links under here @ /group %}
        {% navsublink One @ /group/1 %}
        {% navsublink Two @ /group/2 %}
        {% navsublink Three @ /group/3 %}
        {% navsublink Four @ /group/4 %}
      {% endnavgroup %}
    TEMPLATE
      .should equal_xml(<<-XML)
        <li class="dropdown">
          <a href="/group" class="dropdown-toggle" data-hover="dropdown" data-delay="0" data-close-others="false">
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
      {% navgroup Notable Cryptographers @ /crypto %}
        {% navsublink Alice @ /crypto/alice %}
        {% navsublink Bob @ /crypto/bob %}
      {% endnavgroup %}
    TEMPLATE
      .should equal_xml(<<-XML)
        <li class="dropdown active">
          <a href="/crypto" class="dropdown-toggle" data-hover="dropdown" data-delay="0" data-close-others="false">
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

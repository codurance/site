require 'liquid'

require './_plugins/navigation.rb'

describe Jekyll::Navigation::LinkTag do
  it 'renders a link inside a list item' do
    rendering('{% nav_link Over There @ /link/to/that/thing %}', 'page' => {})
      .should == '<li><a href="/link/to/that/thing">Over There</a></li>'
  end

  it 'renders an active link when on the page being linked' do
    rendering('{% nav_link It\'s me! @ /hello/there %}', 'page' => {'title' => 'It\'s me!'})
      .should == '<li><a href="/hello/there" class="btn-u btn-u-orange">It\'s me!</a></li>'
  end
end

describe Jekyll::Navigation::SubLinkTag do
  it 'renders a link inside a list item' do
    rendering('{% nav_sublink Look at me @ /subpage/one %}', 'page' => {})
      .should == '<li><a href="/subpage/one">Look at me</a></li>'
  end

  it 'renders an active link when on the page being linked' do
    rendering('{% nav_sublink You got me @ /subpage/two %}', 'page' => {'title' => 'You got me'})
      .should == '<li class="active"><a href="/subpage/two">You got me</a></li>'
  end
end

private

def rendering template, parameters = {}
  Liquid::Template.parse(template).render(parameters)
end

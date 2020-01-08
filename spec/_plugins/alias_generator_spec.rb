require 'jekyll'
require 'jekyll/tagging'
require_relative '../../src/_plugins/alias_generator.rb'

describe 'author index' do
  it 'Can create an author index' do
    site = double
    file = double

    video = double
    newsletter = double
    post = double

    allow(video).to receive(:data).and_return({ 'author' => "Author", 'title' => "Star Wars: The Empire Strikes Back"})
    allow(newsletter).to receive(:data).and_return({ 'author' => "NotOurAuthor", 'title' => "Truck Simulator Weekly"})
    allow(post).to receive(:data).and_return({ 'author' => "Author", 'title' => "I Don't Like Bundle Very Much" })

    allow(Jekyll::Utils).to receive(:merged_file_read_opts)
    allow(File).to  receive(:read).and_return(file)

    allow(site).to receive(:in_source_dir)
    allow(site).to receive(:file_read_opts)
    allow(site).to receive(:config).and_return({})
    allow(site).to receive(:collections).and_return({ 
      "videos" => [ video ],
      "newsletters" => [  newsletter ],
      "posts" => [ post ]
      })
    
    author_index = Jekyll::AuthorIndex.new(site, "base", "author_dir", "Author") 
    expect(author_index.data).to eq({ 'author' => "Author", 'description' => 'author: Author', "publications" => [video, post], 'title' => "Author"})
  end  
end  

describe 'alias generator' do
  it 'generate aliases with no posts and no pages' do
    alias_generator = Jekyll::AliasGenerator.new
    site = double
    posts = double
    allow(site).to receive(:posts).and_return(posts)
    allow(posts).to receive(:docs).and_return([])
    allow(site).to receive(:pages).and_return([])
    alias_generator.generate(site)
  end
  
  it 'generate aliases for one post calls add twice' do
    alias_generator = Jekyll::AliasGenerator.new
    site = double
    posts = double
    doc = double
    allow(site).to receive(:posts).and_return(posts)
    allow(posts).to receive(:docs).and_return([doc])
    allow(site).to receive(:pages).and_return([])
    allow(doc).to receive(:url).and_return('/old-article/index.html')
    allow(doc).to receive(:data).and_return( {"alias" => ['/corrected-article/index.html' ]} ) 
    allow(site).to receive(:dest).and_return('/dev/null')
    
    allow(FileUtils).to receive(:mkdir_p)
    file = double
    allow(File).to receive(:open).and_return(file)
    expect(file).to receive(:write)
    allow(Jekyll::AliasFile).to receive(:new).twice().and_return("xxx")
    static_files = double
    allow(site).to receive(:static_files).and_return(static_files)
    expect(static_files).to receive(:<<).twice()
    
    alias_generator.generate(site)
  end

  it 'generate aliases for one page calls add twice' do
    alias_generator = Jekyll::AliasGenerator.new
    site = double
    posts = double
    page = double

    allow(site).to receive(:posts).and_return(posts)
    allow(posts).to receive(:docs).and_return([])
    allow(site).to receive(:pages).and_return([page])

    allow(page).to receive(:destination).with('').and_return('whatever')
    allow(page).to receive(:data).and_return({'alias' => ['/folder/file.html']})
    allow(site).to receive(:dest).and_return('/dev/null')

    allow(FileUtils).to receive(:mkdir_p)
    file = double
    allow(File).to receive(:open).and_return(file)
    expect(file).to receive(:write)
    allow(Jekyll::AliasFile).to receive(:new).twice().and_return("xxx")
    static_files = double
    allow(site).to receive(:static_files).and_return(static_files)
    expect(static_files).to receive(:<<).twice()
    
    alias_generator.generate(site)
  end
  
  it 'alias_template calls destination_path twice' do
    alias_generator = Jekyll::AliasGenerator.new
    destination_path = double
    expect(destination_path).to receive(:to_s).twice()
    alias_generator.alias_template(destination_path)
  end  
end

describe 'AliasFile' do
  it 'modified is false' do
    site = double
    allow(site).to receive(:frontmatter_defaults).and_return(site)
    allow(site).to receive(:all)
    alias_file = Jekyll::AliasFile.new(site, "b", "c", "d")
    expect(alias_file.modified?).to equal(false)
  end  

  it 'write is true' do
    site = double
    allow(site).to receive(:frontmatter_defaults).and_return(site)
    allow(site).to receive(:all)
    alias_file = Jekyll::AliasFile.new(site, "b", "c", "d")
    expect(alias_file.write(nil)).to equal(true)
  end  

end  
# encoding: utf-8
#
# Jekyll author page generator.
# http://recursive-design.com/projects/jekyll-plugins/
#
# Version: 0.1.4 (201101061053)
#
# Copyright (c) 2010 Dave Perrett, http://recursive-design.com/
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
#
# A generator that creates author pages for jekyll sites.
#
# Included filters :
# - author_links:      Outputs the list of author as comma-separated <a> links.
# - date_to_html_string: Outputs the post.date as formatted html, with hooks for CSS styling.
#
# Available _config.yml settings :
# - author_dir:          The subfolder to build author pages in (default is 'authors').
# - author_title_prefix: The string used before the author name in the page title (default is
#                          'Author: ').

module Jekyll

  # The AuthorIndex class creates a single author page for the specified author.
  class AuthorIndex < Page

    # Initializes a new AuthorIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +author_dir+ is the String path between <source> and the author folder.
    #  +author+     is the author currently being processed.
    def initialize(site, base, author_dir, author)
      @site = site
      @base = base
      @dir  = author_dir
      @name = 'index.html'
      self.process(@name)
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), 'author_index.html')
      self.data['author']    = author
      # Set the title for this page.
      title_prefix             = site.config['author_title_prefix'] || 'author: '
      self.data['title']       = "#{author}"
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['author_meta_description_prefix'] || 'author: '
      self.data['description'] = "#{meta_description_prefix}#{author}"
      # Posts should be sorted by date descendingly
      publications = site.collections.values.flatten.select do |post| post.data["author"] == author end
      publications = publications.sort_by{ |post| post.data["date"] }.reverse
      self.data['publications'] = publications
    
    end
  end

  # Jekyll hook - the generate method is called by jekyll, and generates all of the author pages.
  class GenerateAuthor < Generator
    safe true
    priority :high

    def generate(site)
      author_index_writer = AuthorIndexWriter.new site
      write_author_indexes(site, author_index_writer)
    end

    def write_author_indexes(site, author_index_writer)
      if !(site.layouts.key? 'author_index') 
        throw "No 'author_index' layout found."      
      end
      
      site.collections.values.map(&:docs).flatten.each do |post|
        post_authors = [post.data["author"]].flatten()
        post_authors.each do |author|
          author_index_writer.write_author_index(author)
        end
      end
    end
  end

  class AuthorIndexWriter

    def initialize(site)
      @seen_author = []
      @site = site
      @dir = @site.config['author_dir'] || 'authors'
    end  

    def write_author_index(author)
      #Only do this once per author
      if !@seen_author.include?(author)
        @seen_author << author
        author_dir = File.join(@dir, AuthorNameToPath.parse(author))
        index = AuthorIndex.new(@site, @site.source, author_dir, author)
        index.render(@site.layouts, @site.site_payload)
        index.write(@site.dest)
        # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
        @site.pages << index
      end
    end
  end  

  # Adds some extra filters used during the author creation process.
  module Filters

    # Outputs a list of authors as comma-separated <a> links. This is used
    # to output the author list for each post on a author page.
    #
    #  +author+ is the list of author to format.
    #
    # Returns string
    #
    def author_links(authors)
      if authors == nil
        return ''
      end  

      if String.try_convert(authors)
        authors = [ authors ]
      end

      authors = authors.select {|item| item != ""} || []

      authors = authors.map do |author|
        author_url = author_url(author)
        "<a class='author' href='#{author_url}'>#{author}</a>"  
      end

      authors.join(', ')
    end

    def author_url(author)
        basedir = @context.registers[:site].config['author_dir'] || "authors"
        baseurl = @context.registers[:site].config['baseurl']
        author_dir = AuthorNameToPath.parse(author)

        "#{baseurl}/#{basedir}/#{author_dir}/"
    end

    # Outputs the post.date as formatted html, with hooks for CSS styling.
    #
    #  +date+ is the date object to format as HTML.
    #
    # Returns string
    def date_to_html_string(date)
      result = '<span class="month">' + date.strftime('%b').upcase + '</span> '
      result += date.strftime('<span class="day">%d</span> ')
      result += date.strftime('<span class="year">%Y</span> ')
      result
    end

  end

  module AuthorNameToPath
    def self.parse(name)
        name.downcase.gsub(" ", "-")
    end
  end

end

Liquid::Template.register_filter(Jekyll::Filters)

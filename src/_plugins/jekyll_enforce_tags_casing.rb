Jekyll::Hooks.register :site, :post_read do |site|
  tags = site.tags.keys
  unique_tags = tags.uniq {|tag| Jekyll::Utils.slugify(tag)}
  duplicates = tags - unique_tags

  if duplicates.size > 0
    raise "There are tags with colliding slugs.
        Please deduplicate these tags:
          #{duplicates.join("\n          ")}"
  end
end

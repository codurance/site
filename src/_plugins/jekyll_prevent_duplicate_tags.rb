def slugify(tag)
  Jekyll::Utils.slugify(tag)
end

Jekyll::Hooks.register :site, :post_read do |site|
  tags = site.tags.keys
  unique_tags = tags.uniq(&method(:slugify))
  duplicates = tags - unique_tags

  if duplicates.size > 0
    collisions = duplicates.map {|tag|
      slug = slugify(tag)
      colliding_tags = tags.filter {|t| slugify(t) == slug}.join(", ")
      "#{colliding_tags} (slug: #{slug})"
    }.join("\n")

    raise "There are tags with colliding slugs.\nPlease deduplicate these tags:\n#{collisions}"
  end
end

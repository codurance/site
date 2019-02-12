Jekyll::Hooks.register :site, :post_read do |site|
  tags = site.tags.keys
  uniqueTags = tags.uniq(&:downcase)
  duplicates = tags - uniqueTags
  
  if duplicates.size > 0
    raise "There are duplicated tags with different casing. Please check and fix the tags '#{duplicates}'"
  end

end
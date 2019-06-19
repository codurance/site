task :buildprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_prb.yml --trace'
end

task :buildesprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml,build/config/_config_prb.yml --trace --destination output/_site_es/'
end

task :buildenprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml,build/config/_config_prb.yml --trace'
end

multitask serve:      [:_build_en,       :_build_es,       :_ruby_serve]
multitask servequick: [:_build_en_quick, :_build_es_quick, :_ruby_serve]

task :_build_en_quick do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml --watch --destination output/_site/en --baseurl /en  --limit_posts 3 '
end

task :_build_es_quick do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml --watch --destination output/_site/es --baseurl /es  --limit_posts 3 '
end

task :_build_en do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml --watch --destination output/_site/en --baseurl /en'
end

task :_build_es do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml --watch --destination output/_site/es --baseurl /es'
end

task :_ruby_serve do
  sh 'mkdir -p output/_site'
  sh 'cp build/config/index.html output/_site/'
  sh 'ruby -run -ehttpd output/_site/ -p4000 > /dev/null 2>&1'
end

task :test do
  sh 'bundle exec rspec'
end

task :checklinks do
  sh 'ruby ./tools/broken-links-detector/detect_broken_links.rb'
end

task :default => :servequick

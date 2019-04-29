task :build do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_default.yml --trace'
end

task :buildboth do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_default.yml --trace'
end

task :buildprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_prb.yml --trace'
end

task :buildesprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml,build/config/_config_prb.yml --trace --destination output/_site_es/'
end

task :buildenprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml,build/config/_config_prb.yml --trace'
end

task :serve do
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_en.yml --watch --trace --port 4000 --host 0.0.0.0'
end

task :servees do
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_es.yml --watch --trace --port 4000 --host 0.0.0.0'
end

task :servequick do
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_en.yml --watch --limit_posts 3 --port 4000 --host 0.0.0.0'
end

task :servequickes do
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_es.yml --watch --limit_posts 3 --port 4000 --host 0.0.0.0'
end

multitask servebothquick: [:_build_en_quick, :_build_es_quick, :_ruby_serve]

task :_build_en_quick do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml --watch --incremental --limit_posts 3 --destination output/_site/en --baseurl /en'
end

task :_build_es_quick do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml --watch --incremental --limit_posts 3 --destination output/_site/es --baseurl /es'
end

task :_ruby_serve do
  sh 'mkdir -p output/_site'
  sh 'cp build/config/index.html output/_site/'
  sh 'open http://localhost:4000/'
  sh 'ruby -run -ehttpd output/_site/ -p4000 > /dev/null 2>&1'
end

task :en do
  sh 'rm -rf _site'
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_en.yml --watch --incremental --limit_posts 3'
end

task :es do
  sh 'rm -rf _site'
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_es.yml --watch --incremental --limit_posts 3'
end

task :test do
  sh 'bundle exec rspec'
end

task :checklinks do
  sh 'ruby ./tools/broken-links-detector/detect_broken_links.rb'
end

task :default => :servequick

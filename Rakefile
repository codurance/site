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

task :en do
  sh 'rm -rf _site'
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_en.yml --watch --incremental --limit_posts 3'
end

task :es do
  sh 'rm -rf _site'
  sh 'bundle exec jekyll serve --config build/config/_config.yml,build/config/_config_es.yml --watch --incremental --limit_posts 3'
end

task :default => :servequick

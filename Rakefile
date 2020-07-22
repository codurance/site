task :buildprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_prb.yml --trace --lsi'
end

task :buildesprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_es.yml,build/config/_config_prb.yml --trace --destination output/_site_es/ --lsi'
end

task :buildenprb do
  sh 'bundle exec jekyll build --config build/config/_config.yml,build/config/_config_en.yml,build/config/_config_prb.yml --trace --lsi'
end

multitask serve:      [:_build_en,       :_build_es,       :_ruby_serve]
multitask servequick: [:_build_en_quick, :_build_es_quick, :_ruby_serve]
multitask servepolling: [:_build_with_polling_en, :_build_with_polling_es, :_ruby_serve]
multitask servepollingquick: [:_build_quick_with_polling_en, :_build_quick_with_polling_es, :_ruby_serve]

def _start_jekyll_build(language, limit_posts: false, use_polling_watcher: false)
  build_command = "bundle exec jekyll build --config build/config/_config.yml,build/config/_config_#{language}.yml --watch --destination output/_site/#{language} --baseurl /#{language}"

  if limit_posts
    build_command += ' --limit_posts 10'
  end

  if use_polling_watcher
    build_command += ' --force_polling'
  end

  puts "Running build command: #{build_command}"
  sh build_command
end

task :_build_quick_with_polling_en do
  _start_jekyll_build('en', limit_posts: true, use_polling_watcher: true)
end

task :_build_with_polling_en do
  _start_jekyll_build('en', use_polling_watcher: true)
end
task :_build_quick_with_polling_es do
  _start_jekyll_build('es', limit_posts: true, use_polling_watcher: true)
end

task :_build_with_polling_es do
  _start_jekyll_build('es', use_polling_watcher: true)
end

task :_build_en_quick do
  _start_jekyll_build('en', limit_posts: true)
end

task :_build_es_quick do
  _start_jekyll_build('es', limit_posts: true)
end

task :_build_en do
  _start_jekyll_build 'en'
end

task :_build_es do
  _start_jekyll_build 'es'
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

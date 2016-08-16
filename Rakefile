require 'rspec/core/rake_task'

SPEC_DIRECTORY = '_spec'

RSpec::Core::RakeTask.new(:spec) do |task|
  task.pattern = Dir.glob("#{SPEC_DIRECTORY}/**/*_spec.rb")
  task.rspec_opts = '--color'
end

task :build do
  sh 'bundle exec jekyll build --trace'
end

task :serve do
  sh 'bundle exec jekyll serve --watch --trace'
end

task :servequick do
  sh 'bundle exec jekyll serve --watch --incremental --limit_posts 3'
end

task :default => :spec

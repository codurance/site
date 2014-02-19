require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |task|
  task.rspec_opts = '--color _spec'
end

task :test => :spec

task :build do
  sh 'bundle exec jekyll build --trace'
end

task :serve do
  sh 'bundle exec jekyll serve --watch --trace'
end

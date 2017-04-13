#!/bin/bash


cd /site
gem install bundler
gem install rspec-core -v '3.4.1'
gem install jekyll
bundle install
exec rake servequick



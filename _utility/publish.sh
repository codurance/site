#!/usr/bin/env bash

set -e

git config --global user.name 'Travis CI'
git config --global user.email 'travis@travis-ci.org'

git clone --quiet --branch=gh-pages "https://${GITHUB_TOKEN}@github.com/codurance/site.git" /tmp/_site > /dev/null
bundle exec jekyll build --destination /tmp/_site --trace

cd /tmp/_site
git add -A
git commit -m "Site built by CI build number ${TRAVIS_BUILD_NUMBER}."
git push --quiet origin gh-pages

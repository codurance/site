#!/usr/bin/env bash

echo "Starting Jekyll to take screenshots"
bundle exec jekyll serve --no-watch --detach

echo "Taking screenshots with PhantomJS"
phantomjs _utility/take-screenshot.js http://localhost:4000/blog/ blog.png 1200px*800px

echo "Sending to imgur"
_utility/imgurbash.sh blog.png

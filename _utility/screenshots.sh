#!/usr/bin/env bash

bundle exec jekyll serve --no-watch --detach
curl http://localhost:4000/blog/

#!/usr/bin/env bash

jekyll serve --no-watch --skip-initial-build --detach
curl http://localhost:4000/blog

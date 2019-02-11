#!/bin/bash

set -e

cd output/_site

aws s3 sync ./assets s3://codurance-website-en/assets --size-only --acl public-read --exclude "*" --include "*.jpeg" --include "*.jpg" \
  --include "*.png" --include "*.gif" --include "*.svg" --include "*.woff"  --include "*.eot" --include "*.woff1" --include "*.ttf"  --include "*.pdf"
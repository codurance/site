#!/bin/bash

set -e

cd output/_site

aws s3 sync ./assets s3://codurance-website-en/assets --acl public-read --exclude "*.jpeg" --exclude "*.jpg" \
  --exclude "*.png" --exclude "*.gif" --exclude "*.svg" --exclude "*.woff"  --exclude "*.eot" --exclude "*.woff1" --exclude "*.ttf"  --exclude "*.pdf"

aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/assets/*"

#!/bin/bash

set -e

cd output/_site_es/

aws s3 sync ./assets s3://codurance-website-es/assets --acl public-read --exclude "*.jpeg" --exclude "*.jpg" \
  --exclude "*.png" --exclude "*.gif" --exclude "*.svg" --exclude "*.woff"  --exclude "*.eot" --exclude "*.woff1" --exclude "*.ttf"  --exclude "*.pdf"

aws cloudfront create-invalidation --distribution-id E12HY50RS84ICW --paths "/assets/*"
cd ../..

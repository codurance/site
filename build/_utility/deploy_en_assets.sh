#!/bin/bash

set -e

cd output/_site

aws s3 sync ./assets s3://codurance-website-en/assets --acl public-read --exclude "*" --include "*.js" --include "*.css" --delete

aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/assets/*"

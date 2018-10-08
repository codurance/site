#!/bin/bash

set -e

cd _site
aws s3 sync . s3://codurance-website-en --exclude "es/*" --exclude "assets/*" --acl public-read
aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/*"

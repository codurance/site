#!/bin/bash

set -e

cd output/_site_es/
aws s3 sync . s3://codurance-website-es --exclude "assets/*" --acl public-read --content-encoding gzip
aws cloudfront create-invalidation --distribution-id E12HY50RS84ICW --paths "/*"
cd ../../..

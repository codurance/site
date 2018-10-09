#!/bin/bash

set -e

cd output/_site_es/
aws s3 sync ./assets s3://codurance-website-es/assets --size-only --acl public-read
aws cloudfront create-invalidation --distribution-id E12HY50RS84ICW --paths "/assets/*"
cd ../..

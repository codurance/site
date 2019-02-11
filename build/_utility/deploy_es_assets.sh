#!/bin/bash

set -e

cd output/_site_es/

aws s3 sync ./assets s3://codurance-website-es/assets --acl public-read --exclude "*" --include "*.js" --include "*.css"

aws cloudfront create-invalidation --distribution-id E12HY50RS84ICW --paths "/assets/*"
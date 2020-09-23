#!/bin/bash

set -e

cd output/_site_es/
aws s3 sync . s3://codurance-website-es --exclude "assets/*" --exclude "services/*" --acl public-read --delete

cd ../../../redirects-for-spanish-services-pages/
aws s3 sync . s3://codurance-website-es/services --acl public-read --delete

aws cloudfront create-invalidation --distribution-id E12HY50RS84ICW --paths "/*"

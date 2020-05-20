#!/bin/bash

set -e

cd output/_site

aws s3 sync ./assets s3://codurance-website-en/assets --size-only --acl public-read --exclude "*.js" --exclude "*.css" --delete
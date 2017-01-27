#!/bin/bash
set -e

if [ "$#" -ne 1 ]; then
  echo "Insufficient arguments, you have only provided: \"$@\", see usage and example for further assistance."
  echo -e "Usage: $0 FOLDER_NAME\n"
  echo "Example: $0 a-folder-name"
  exit 1
fi

FOLDER_NAME=$1

cd _site/

echo "Synchronizing to folder: $FOLDER_NAME"
aws s3 sync . s3://codurance-site-pr/$FOLDER_NAME --acl public-read
aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/$FOLDER_NAME/*"


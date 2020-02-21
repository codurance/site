#!/bin/bash
set -e

if [ "$#" -ne 1 ]; then
  echo "Insufficient arguments, you have only provided: \"$@\", see usage and example for further assistance."
  echo -e "Usage: $0 FOLDER_NAME\n"
  echo "Example: $0 a-folder-name"
  exit 1
fi

FOLDER_NAME=$1

cd output/_site/

echo "Synchronizing assets to folder: $FOLDER_NAME/en/assets"
aws s3 sync ./en/assets s3://codurance-site-pr/$FOLDER_NAME/en/assets --size-only --acl public-read --delete

echo "Synchronizing assets to folder: $FOLDER_NAME/es/assets"
aws s3 sync ./es/assets s3://codurance-site-pr/$FOLDER_NAME/es/assets --size-only --acl public-read --delete

aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/$FOLDER_NAME/*"


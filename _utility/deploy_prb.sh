#!/bin/bash
set -e

if [ "$#" -ne 3 ]; then
  echo "Insufficient arguments, you have only provided: \"$@\", see usage and example for further assistance."
  echo -e "Usage: $0 AWS_REGION WEBSITE_INDEX_DOCUMENT BUCKET_NAME\n"
  echo "Example: $0 eu-west-1 index.html a-bucket-name"
  exit 1
fi

cd _site/

AWS_REGION=$1
WEBSITE_INDEX_DOCUMENT=$2
BUCKET_NAME=$3

bucketDoesNotExist() {
  number_of_buckets_with_name=$(aws s3 ls | awk '{print $3}' | grep -c "^$1$") 
  echo $(expr $number_of_buckets_with_name = "1") == 0 
}

BUCKET_NOT_EXISTS=$(bucketDoesNotExist $BUCKET_NAME)
if [ $BUCKET_NOT_EXISTS ]; then
  aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION
  aws s3 website s3://$BUCKET_NAME --index-document $WEBSITE_INDEX_DOCUMENT	
fi

aws s3 sync . s3://$BUCKET_NAME --acl public-read
aws cloudfront create-invalidation --distribution-id EML2BUMD54HSC --paths "/*"

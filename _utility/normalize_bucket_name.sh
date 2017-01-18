#!/bin/bash
set -e

normalizedBucketName() {
  LOWERCASE_BUCKET_NAME=${1,,}
  echo ${LOWERCASE_BUCKET_NAME//_/-}
}

normalizedBucketName $1

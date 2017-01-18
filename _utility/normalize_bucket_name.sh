#!/bin/bash
set -e

LOWERCASE_BUCKET_NAME=${1,,}
echo ${LOWERCASE_BUCKET_NAME//_/-}

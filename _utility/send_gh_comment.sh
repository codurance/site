#!/bin/bash
set -e

if [ "$#" -ne 5 ]; then
  echo "Insufficient arguments, see usage and example for further assistance."
  echo -e "Usage: $0 REPO_OWNER REPO_NAME PR_NUMBER AUTH_TOKEN DEPLOYMENT_URL\n"
  echo "Example: $0 codurance site 4 token https://bucket-name.amazon.com/index.html"
  exit 1
fi

REPO_OWNER=$1
REPO_NAME=$2
PR_NUMBER=$3
AUTH_TOKEN=$4
BUCKET_NAME=$(_utility/normalize_bucket_name.sh $5)

COMMENT="Deployed: $BUCKET_NAME"
LAST_COMMENT_ID=$(curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$AUTH_TOKEN -X GET | jq '[.[] | select(.user.login=="CoduranceBot")][0].id')

if [ "$LAST_COMMENT_ID" != "null" ]; then
  echo "Found a previous comment with id:$LAST_COMMENT_ID . Updating comment"
  curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/comments/$LAST_COMMENT_ID?access_token=$AUTH_TOKEN \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{ \"body\":\"$COMMENT\" }"
else
  echo "Creating a comment with deployment url"
  curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$AUTH_TOKEN \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{ \"body\":\"$COMMENT\" }" 
fi

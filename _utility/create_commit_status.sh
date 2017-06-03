#!/bin/bash
set +e

REPO_OWNER=$1
REPO_NAME=$2
GITHUB_TOKEN=$3
DEPLOYMENT_URL=$4
COMMIT_SHA=$5

curl "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/statuses/$COMMIT_SHA?access_token=$GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{
        \"state\":\"success\",
        \"target_url\": \"$DEPLOYMENT_URL\",
        \"description\": \"Deployed preview\",
        \"context\": \"codurance/preview\"
      }"


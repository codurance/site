#!/bin/bash
set +e

REPO_OWNER=''
REPO_NAME=''
PR_NUMBER=''
GITHUB_TOKEN=''
DEPLOYMENT_URL=''
GITHUB_USERNAME='CoduranceBot'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR/send_gh_comment_validation.sh"

if [ -z "$PR_NUMBER" ]; then
  PR_NUMBER=$(curl -X GET -u ${GITHUB_TOKEN}:x-oauth-basic "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?head=${REPO_OWNER}:${CIRCLE_BRANCH}" | jq ".[0].number")
	if [ -z "$PR_NUMBER" ]; then
		echo "PR_NUMBER not specified, and can't be determined in the current context"
		exit 1
	fi
fi

LAST_COMMENT_ID=$(curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$GITHUB_TOKEN -X GET | jq "[.[] | select(.user.login==\"$GITHUB_USERNAME\")][0].id")
if [ $? -ne 0 ]; then
  echo "Error while parsing last commend id"
  exit 1
fi

COMMENT="Deployed: $DEPLOYMENT_URL"
if [ "$LAST_COMMENT_ID" != "null" ]; then
	echo "Found a previous comment with id:$LAST_COMMENT_ID . Updating comment"
	curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/comments/$LAST_COMMENT_ID?access_token=$GITHUB_TOKEN \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{ \"body\":\"$COMMENT\" }"
else
	echo "Creating a comment with deployment url"
	curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$GITHUB_TOKEN \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{ \"body\":\"$COMMENT\" }"
fi

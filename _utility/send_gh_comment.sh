#!/bin/bash
set +e

REPO_OWNER=''
REPO_NAME=''
PR_NUMBER=''
GITHUB_TOKEN=''
DEPLOYMENT_URL=''
GITHUB_USERNAME='CoduranceBot'
EXECUTE='0'
NULL='null'

DIR="$( cd $( dirname "${BASH_SOURCE[0]}" ) && pwd )"
source "$DIR/send_gh_comment_validation.sh"

COMMENT="Deployed: $DEPLOYMENT_URL"

function get_pr_number_by_branch_name() {
  if [ -n "$CIRCLE_BRANCH" ]; then
    pr_number_by_branch=$(curl -X GET -u ${GITHUB_TOKEN}:x-oauth-basic "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?head=${REPO_OWNER}:${CIRCLE_BRANCH}" | jq ".[0].number")
    if [ $? -ne 0 ] && [ "$pr_number_by_branch" != $NULL ]; then
      PR_NUMBER=pr_number_by_branch
    fi
  fi
}

function get_last_comment_id_generated_by_bot() {
  LAST_COMMENT_ID=$(curl https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$GITHUB_TOKEN -X GET | jq "[.[] | select(.user.login==\"$GITHUB_USERNAME\")][0].id")
  if [ $? -ne 0 ]; then
    echo $NULL
  fi
  echo $LAST_COMMENT_ID
}

send_comment_to_github() {
  if [ "$EXECUTE" == "1" ]; then
    curl $1 \
      -H "Content-Type: application/json" \
      -X POST \
      -d "{ \"body\":\"$COMMENT\" }"
  fi
}

function update_last_comment() {
  echo "Found a previous comment with id:$LAST_COMMENT_ID . Updating comment"
  send_comment_to_github "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/comments/$LAST_COMMENT_ID?access_token=$GITHUB_TOKEN";
}

function create_comment() {
  echo "Creating a comment with deployment url"
  send_comment_to_github "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues/$PR_NUMBER/comments?access_token=$GITHUB_TOKEN";
}

if [ -z "$PR_NUMBER" ]; then
  echo "Pr number not found, trying to guess it by branch name."
  get_pr_number_by_branch_name;
  if [ -z "$PR_NUMBER" ]; then
    echo "Pr number not specified, and can't be determined by branch name"
    exit 0
  fi
fi

LAST_COMMENT_ID=$(get_last_comment_id_generated_by_bot);
if [ "$LAST_COMMENT_ID" == $NULL ]; then
  create_comment;
else
  update_last_comment;
fi


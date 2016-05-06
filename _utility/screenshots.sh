#!/usr/bin/env bash

if [ $TRAVIS_PULL_REQUEST = "true" ]
then
	echo "Starting Jekyll to take screenshots"
	bundle exec jekyll serve --no-watch --detach

	echo "Taking screenshots with PhantomJS"
	phantomjs _utility/take-screenshot.js http://localhost:4000/blog/ blog.png 1200px*800px

	echo "Sending to imgur"
	SCREENSHOT_URL=`_utility/imgurbash.sh blog.png`
	SCREENSHOT_URL_HTTPS=${SCREENSHOT_URL//http:\/\//https:\/\/}
	
	echo "Updating commit status with screenshot at $SCREENSHOT_URL_HTTPS"
	curl -H "Authorization: token $GITHUB_TOKEN" -X POST https://api.github.com/repos/codurance/site/statuses/$TRAVIS_COMMIT -d '{"state":"success","target_url":"$SCREENSHOT_URL_HTTPS","description":"Screenshot of the blog page","context":"continuous-integration/screenshot"}'
fi

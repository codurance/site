#!/usr/bin/bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=e86bb6fca41e4f9588e31d46c2d468ba34b84281\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/codurance/site/tree/busconf

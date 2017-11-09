#!/bin/bash

set -e
cd /site
bundle install
if [[ -z $RAKE_TARGET ]]; then 
    RAKE_TARGET="servequick"
fi

set -x
bundle exec rake $RAKE_TARGET


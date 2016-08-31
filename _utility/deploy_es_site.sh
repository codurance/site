#!/bin/bash

set -e

cd _site/es
aws s3 sync . s3://codurance-website-es
cd ../..

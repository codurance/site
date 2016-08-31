#!/bin/bash
aws s3 mb s3://codurance-website-es --region $AWS_REGION
#aws cloudfront create-distribution --distribution-config file://scripts/cloudfront-conf.json

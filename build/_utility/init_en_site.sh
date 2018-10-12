#!/bin/bash
aws s3 mb s3://codurance-website-en --region $AWS_REGION
aws s3 website s3://codurance-website-en/ --index-document index.html

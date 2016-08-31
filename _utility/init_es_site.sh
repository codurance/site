#!/bin/bash
aws s3 mb s3://codurance-website-es --region $AWS_REGION
aws s3 website s3://codurance-website-es/ --index-document index.html

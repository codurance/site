#!/bin/bash

set -eux
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"
if [[ "$FOLDER_NAME" != "site-master" ]]; then
  echo "baseurl: /$FOLDER_NAME" > _config_prb.yml
  cat _config_prb.yml
  rake buildenprb
  export enUrl=ruby read_yaml_value.rb "_config.yml" "domains.en"
  echo enUr
  # $(ruby read_yaml_value.rb "_config.yml" "domains.en")	
  # $(ruby read_yaml_value.rb "_config.yml" "domains.es")
else
  echo "baseurl: ''" > _config_prb.yml
  rake buildesprb
  rake buildenprb
  export enUrl=$(cat _config.yml | ruby read_yaml_value.rb "_config.yml" "domains.en")	
  export esUrl=$(cat _config.yml | ruby read_yaml_value.rb "_config.yml" "domains.es")
  sed -i "s#${enUrl}#${esUrl}#g" ./_site_es/sitemap.xml
fi


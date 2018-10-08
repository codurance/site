#!/bin/bash

set -eux
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"
if [[ "$FOLDER_NAME" != "site-master" ]]; then
  echo "baseurl: /$FOLDER_NAME" > build/config/_config_prb.yml
  cat build/config/_config_prb.yml
  rake buildenprb
  ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.en"
  ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.es"
else
  echo "baseurl: ''" > build/config/_config_prb.yml
  rake buildesprb
  rake buildenprb
  export enUrl=$(ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.en")	
  export esUrl=$(ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.es")
  sed -i "s#${enUrl}#${esUrl}#g" ./output/_site_es/sitemap.xml
fi


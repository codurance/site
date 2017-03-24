#!/bin/bash

set -e
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"
if [[ "$FOLDER_NAME" != "site-master" ]]; then
  echo "baseurl: /$FOLDER_NAME" > _config_prb.yml
  cat _config_prb.yml
  rake buildenprb
   export enUrl=$(cat _config.yml | shyaml domains.en)
  export esUrl=$(cat _config.yml | shyaml domains.es)
  sed -Ei '' 's/$snUrl/$enUrl/g' ./_site/sitemap.xml
else
  echo "baseurl: ''" > _config_prb.yml
  rake buildesprb
  rake buildenprb
  pip install shyaml
  export enUrl=$(cat _config.yml | shyaml domains.en)
  export esUrl=$(cat _config.yml | shyaml domains.es)
  sed -Ei '' 's/$enUrl/$esUrl/g' ./_site_es/sitemap.xml

fi


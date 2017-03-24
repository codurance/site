#!/bin/bash

set -eux
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"
if [[ "$FOLDER_NAME" != "site-master" ]]; then
  echo "baseurl: /$FOLDER_NAME" > _config_prb.yml
  cat _config_prb.yml
  rake buildenprb
  pip install shyaml
  export enUrl=$(cat _config.yml | shyaml get-value domains.en)
  export esUrl=$(cat _config.yml | shyaml get-value domains.es)
  sed -i 's/${enUrl}/${esUrl}/g' ./_site/sitemap.xml
else
  echo "baseurl: ''" > _config_prb.yml
  rake buildesprb
  rake buildenprb
  pip install shyaml
  export enUrl=$(cat _config.yml | shyaml get-value domains.en)
  export esUrl=$(cat _config.yml | shyaml get-value domains.es)
  sed -i 's/${esUrl}/${enUrl}/g' ./_site_es/sitemap.xml

fi


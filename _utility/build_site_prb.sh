#!/bin/bash

set -eux
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"

if [[ "$FOLDER_NAME" != "site-master" ]]; then
  echo "baseurl: /$FOLDER_NAME/en" >> _config_en.yml
  echo "baseurl: /$FOLDER_NAME/es" >> _config_es.yml
else
  echo "baseurl: ''" > _config_prb.yml
fi

rake buildesprb
rake buildenprb

pip install shyaml
export enUrl=$(cat _config.yml | shyaml get-value domains.en)
export esUrl=$(cat _config.yml | shyaml get-value domains.es)
sed -i "s#${enUrl}#${esUrl}#g" ./_site_es/sitemap.xml
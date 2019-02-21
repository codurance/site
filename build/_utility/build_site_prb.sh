#!/bin/bash

set -eux
FOLDER_NAME=$1

echo "Building website for: $FOLDER_NAME"
if [[ "$FOLDER_NAME" == "site-master" ]]
then
  echo "baseurl: ''" > build/config/_config_prb.yml
  rake buildesprb
  rake buildenprb
  export enUrl=$(ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.en")
  export esUrl=$(ruby build/_utility/read_yaml_value.rb "build/config/_config.yml" "domains.es")
  sed -i "s#${enUrl}#${esUrl}#g" ./output/_site_es/sitemap.xml
else
  cat > build/config/_config_prb.yml <<EOF
baseurl: /$FOLDER_NAME/en
destination: ./output/_site/en
languages: ["en"]
EOF
  rake buildprb

  cat > build/config/_config_prb.yml <<EOF
baseurl: /$FOLDER_NAME/es
destination: ./output/_site/es
languages: ["es"]
EOF
  rake buildprb

  cp build/config/index.html output/_site/

  rake test
fi

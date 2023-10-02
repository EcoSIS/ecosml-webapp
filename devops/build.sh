#! /bin/bash

# ./gitinfo.sh

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR/..

ORG=gcr.io/ecosis-prod

if [[ -z $BRANCH_NAME ]]; then
  BRANCH_NAME=$(git branch | grep '\*' | sed -E "s/\*//g" | sed -E "s/ //g")
fi

echo "building $ORG/ecosml-webapp:$BRANCH_NAME"
docker build --cache-from $ORG/ecosml-webapp:$BRANCH_NAME -t $ORG/ecosml-webapp:$BRANCH_NAME ./server
# echo "building ecosis/ecosml-webapp:dev"
# docker build -t ecosis/ecosml-webapp:dev .
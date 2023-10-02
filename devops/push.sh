#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR/..

if [[ -z $BRANCH_NAME ]]; then
  BRANCH_NAME=$(git branch | grep '\*' | sed -E "s/\*//g" | sed -E "s/ //g")
fi

echo "pushing gcr.io/ecosis/ecosml-webapp:${BRANCH_NAME}"
docker push gcr.io/ecosis/ecosml-webapp:${BRANCH_NAME}
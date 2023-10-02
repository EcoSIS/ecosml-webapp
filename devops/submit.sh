#! /bin/bash

###
# Submit a new build to google cloud.  While this repository is wired
# up to CI triggers, it can be usefull in development to manually cut
# docker images without having to commit code.
###

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR/..

gcloud config set project ecosis-prod

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "Submitting build to Google Cloud..."
gcloud builds submit \
  --config ./devops/cloudbuild.yaml \
  --substitutions=BRANCH_NAME=$BRANCH_NAME \
  .
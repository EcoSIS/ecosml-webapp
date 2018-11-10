#! /bin/bash

BRANCH=$(git branch | grep '\*' | sed -E "s/\*//g" | sed -E "s/ //g")
echo "pushing ecosis/ecosml-webapp:${BRANCH}"
docker push ecosis/ecosml-webapp:${BRANCH}
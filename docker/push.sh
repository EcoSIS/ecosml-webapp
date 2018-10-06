#! /bin/bash

BRANCH=$(git branch | grep '\*' | sed -E "s/\*//g" | sed -E "s/ //g")
docker push ecosis/ecosml-webapp:${BRANCH}
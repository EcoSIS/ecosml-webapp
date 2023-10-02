#! /bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../server

TAG=$(git describe --tags | sed -E "s/\n//g")
BRANCH=$(git branch | grep '\*' | sed -E "s/\*//g" | sed -E "s/ //g")
COMMIT=$(git log  -1 | sed -n 1p | sed -E "s/commit//g" | sed -E "s/ //g")

# echo "{\"tag\":\"${TAG}\",\"branch\":\"${BRANCH}\",\"commit\":\"${COMMIT}\"}" > gitinfo.json
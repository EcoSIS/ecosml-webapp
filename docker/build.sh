#! /bin/bash

./gitinfo.sh

echo "building ecosis/ecosml-webapp:dev"
docker build -t ecosis/ecosml-webapp:dev ../server
# echo "building ecosis/ecosml-webapp:dev"
# docker build -t ecosis/ecosml-webapp:dev .
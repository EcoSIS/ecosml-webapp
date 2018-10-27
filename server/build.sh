#! /bin/bash

rm -rf dist
mkdir dist

cp -r public/loader dist/
cp -r public/images dist/
cp public/index.html dist/

webpack --config webpack-dist.config.js
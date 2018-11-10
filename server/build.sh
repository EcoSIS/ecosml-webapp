#! /bin/bash

rm -rf dist
mkdir dist

cp -r public/loader dist/
cp -r public/images dist/
cp public/index.html dist/
cp public/package.json dist/

webpack --config webpack-dist.config.js
const functions = require('firebase-functions');
const travis = require('./lib/travis');
const github = require('./lib/github');
const ecosis = require('./lib/ecosis');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addTravisBuild = functions.https.onRequest((request, response) => {
  travis('prod', request, response);
});
exports.addTravisBuildDev = functions.https.onRequest((request, response) => {
  travis('dev', request, response);
});

exports.onGithubCommit = functions.https.onRequest((request, response) => {
  github('prod', request, response);
});
exports.onGithubCommitDev = functions.https.onRequest((request, response) => {
  github('dev', request, response);
});

exports.ecosisSync = functions.https.onRequest((request, response) => {
  ecosis('prod', request, response);
});
exports.ecosisSyncDev = functions.https.onRequest((request, response) => {
  ecosis('dev', request, response);
});
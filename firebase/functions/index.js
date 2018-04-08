const functions = require('firebase-functions');
const admin = require('firebase-admin');
const travis = require('./lib/travis');
const github = require('./lib/github');
const ecosis = require('./lib/ecosis');
const config = require('./lib/config');

admin.initializeApp();

// register endpoints for each enviornment
config.envs.forEach(env => {
  let suffix = cap(env);

  // travis builds
  exports[`travisBuild${suffix}`] = functions.https.onRequest((req, resp) => {
    travis(env, req, resp);
  });

  // github webhooks
  exports[`githubWebhook${suffix}`] = functions.https.onRequest((req, resp) => {
    github(env, req, resp);
  });

  // ecosis organizations
  exports[`ecosisSync${suffix}`] = functions.https.onRequest((req, resp) => {
    ecosis(env, req, resp);
  });
});

function cap(text) {
  return text.charAt(0).toUpperCase() + text.substr(1);
}

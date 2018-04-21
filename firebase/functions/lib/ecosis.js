const admin = require('firebase-admin');
const config = require('./config');
const jwt = require('jsonwebtoken');

const REMOTE_ATTR = ['extras', 'groups', 'num_followers', 
'package_count', 'revision_id', 'tags', '']


module.exports = (env, req, resp) => {
  // TODO: verify token
  if( !verifyRequest(req.get('x-ecosis-signature'), env) ) {
    return resp.status(401).send();
  }

  let msg = JSON.parse(req.rawBody || '{}');
  let collection = config.ecosis.collections.orgs+'-'+env;

  return admin.
    firestore()
    .collection(collection)
    .add({
      headers : req.headers,
      payload : msg,
      timestamp : Date.now()
    })
    .then((writeResult) => {
      // Send back a message that we've succesfully written the message
      return resp.json({result: `Updated ${msg.id} in ${collection}.`});
    });
}

function verifyRequest(token, env) {
  try {
   jwt.verify(token, config.secrets.ecosml.secret[env]);
   return true;
  } catch(e) {
    return false;
  }
}
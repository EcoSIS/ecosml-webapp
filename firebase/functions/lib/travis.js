const admin = require('firebase-admin');
const config = require('./config');
const crypto = require('crypto');

module.exports = (env, req, resp) => {
  if( !verifyRequest(req) ) {
    return resp.status(401).send();
  }

  let collection = config.travis.collection+'-'+env;

  return admin
  .firestore()
  .collection(collection)
  .add({
    headers : req.headers,
    payload : JSON.parse(req.body.payload)
  })
  .then((writeResult) => {
    return resp.json({result: `Message with ID: ${writeResult.id} added to ${collection}.`});
  });
}

function verifyRequest(req) {
  let travisSignature = Buffer.from(req.headers.signature, 'base64');
  let travisPublicKey = config.secrets.travis.key;
  let verifier = crypto.createVerify('sha1');
  verifier.update(req.body.payload);
  return verifier.verify(travisPublicKey, travisSignature);
}
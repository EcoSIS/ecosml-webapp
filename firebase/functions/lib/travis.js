const admin = require('firebase-admin');
const config = require('./config');
const crypto = require('crypto');

module.exports = (env, request, response) => {
  let collection = config.travis.collectionPrefix+'-'+env;

  return admin.firestore().collection(collection).add({msg: "Added travis build, "+env}).then((writeResult) => {
    // Send back a message that we've succesfully written the message
    return response.json({result: `Message with ID: ${writeResult.id} added to ${collection}.`});
  });
}

function verifyRequest() {
  let travisSignature = Buffer.from(request.headers.signature, 'base64');
  let travisPublicKey = JSON.parse(response.body).config.notifications.webhook.public_key;
  let verifier = crypto.createVerify('sha1');
  verifier.update(payload);
  status = verifier.verify(travisPublicKey, travisSignature);
}
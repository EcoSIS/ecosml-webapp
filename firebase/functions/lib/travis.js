const admin = require('firebase-admin');
const config = require('./config');

module.exports = (env, request, response) => {
  let collection = config.travis.collectionPrefix+'-'+env;

  return admin.firestore().collection(collection).add({msg: "Added travis build, "+env}).then((writeResult) => {
    // Send back a message that we've succesfully written the message
    return response.json({result: `Message with ID: ${writeResult.id} added to ${collection}.`});
  });
}
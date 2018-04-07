const admin = require('firebase-admin');
const config = require('./config');

const REMOTE_ATTR = ['base_ref', 'compare', 'head_commit', 'sender', 'organization']

module.exports = (env, req, resp) => {
  let msg = cleanMsg(JSON.parse(req.rawBody || '{}'));
  let collection = config.github.collectionPrefix+'-'+env;

  return admin.
    firestore()
    .collection(collection)
    .add({
      timestamp : Date.now(),
      event : req.get('X-GitHub-Event'),
      headers : req.headers,
      body: msg
    })
    .then((writeResult) => {
      // Send back a message that we've succesfully written the message
      return resp.json({result: `Message with ID: ${writeResult.id} added to ${collection}.`});
    });
}

function cleanMsg(msg) {
  REMOTE_ATTR.forEach(attr => {
    if( msg[attr] !== undefined ) delete msg[attr];
  });
  
  if( msg.repository ) {
    msg.repository = {
      id : msg.repository.id,
      name : msg.repository.name,
      organization : msg.repository.organization
    };
  }
  
  return msg;
}
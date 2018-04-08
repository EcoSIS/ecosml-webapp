const admin = require('firebase-admin');
const config = require('./config');

const REMOTE_ATTR = ['extras', 'groups', 'num_followers', 
'package_count', 'revision_id', 'tags', '']


module.exports = (env, req, resp) => {
  let msg = JSON.parse(req.rawBody || '{}');
  // TODO: verify token

  let body = msg.body || {};
  let collection = config.ecosis.collections.orgs+'-'+env;

  if( msg.body.deleted ) {
    return admin
      .firestore()
      .collection(collection)
      .doc(body.id)
      .delete()
      .then((writeResult) => {
        return resp.json({result: `Removed ${body.id} from ${collection}.`});
      });
  }

  return admin.
    firestore()
    .collection(collection)
    .doc(body.id)
    .set(body.organization)
    .then((writeResult) => {
      // Send back a message that we've succesfully written the message
      return resp.json({result: `Updated ${body.id} in ${collection}.`});
    });
}

function cleanMsg(msg) {
  REMOTE_ATTR.forEach(attr => {
    if( msg[attr] !== undefined ) delete msg[attr];
  });
  
  if( msg.users ) {
    msg.users = msg.users.map(user => ({
      capacity : user.capacity,
      created : user.created,
      sysadmin : user.sysadmin,
      state : user.state,
      name : user.name,
      display_name : user.display_name,
      fullname : user.fullname
    }));
  }
  
  return msg;
}
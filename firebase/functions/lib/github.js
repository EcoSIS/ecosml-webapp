const admin = require('firebase-admin');
const config = require('./config');
const crypto = require('crypto');

const REMOTE_ATTR = ['base_ref', 'compare', 'head_commit', 'sender', 'organization']

module.exports = (env, req, resp) => {
  let body = req.rawBody;
  let sha1 = req.get('X-Hub-Signature').replace(/^sha1=/, '');

  if( !validRequest(body, sha1, env) ) {
    return resp.status(401).send();
  }

  let msg = JSON.parse(body || '{}');

  let event = req.get('X-GitHub-Event');
  let collection = '';

  if( event === 'push' ) {
    collection = config.github.collections.commits+'-'+env;
    return onCommit(collection, cleanCommitMsg(msg), req, resp);
  } else if( event === 'team' || event === 'membership') {
    collection = config.github.collections.teams+'-'+env;
    return onTeamUpdate(collection, msg, event, req, resp);
  }  
}

function onTeamUpdate(collection, msg, event, req, resp) {
  return admin
    .firestore()
    .collection(collection)
    .add({
      timestamp : Date.now(),
      headers : req.headers,
      event,
      payload : {
        name : msg.team.name,
        slug : msg.team.slug,
        id : msg.team.id
      }
    })
    .then((writeResult) => {
      return resp.json({result: `Set team ${msg.team.slug} update event in ${collection}.`});
    });
}

function onCommit(collection, msg, req, resp) {
  return admin.
    firestore()
    .collection(collection)
    .add({
      timestamp : Date.now(),
      event : 'push',
      headers : req.headers,
      payload: msg
    })
    .then((writeResult) => {
      return resp.json({result: `Message with ID: ${writeResult.id} added to ${collection}.`});
    });
}

function cleanCommitMsg(msg) {
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

function validRequest(body, sha1, env) {
  let hash = crypto.createHmac('sha1', config.secrets.ecosml.secret[env]);
  hash.update(body);
  return  hash.digest('hex') === sha1;
}
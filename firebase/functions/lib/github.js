const admin = require('firebase-admin');
const config = require('./config');

const REMOTE_ATTR = ['base_ref', 'compare', 'head_commit', 'sender', 'organization']

module.exports = (env, req, resp) => {
  let msg = JSON.parse(req.rawBody || '{}');

  let event = req.get('X-GitHub-Event');
  let collection = '';

  if( event === 'push' ) {
    collection = config.github.collections.commits+'-'+env;
    return onCommit(collection, cleanCommitMsg(msg), req, resp);
  } else if( event === 'team') {
    collection = config.github.collections.teams+'-'+env;
    onTeamUpdate(collection, msg, resp);
  } else if( event === 'membership' ) {
    collection = config.github.collections.teams+'-'+env;
    onMembershipUpdate(collection, msg, resp);
  }
  
}

function onMembershipUpdate(collection, msg, resp) {
  return admin.
    firestore()
    .collection(collection)
    .doc(msg.team.slug)
    .get()
    .then((doc) => {
      // TODO: log this?
      // this event is fired when team is deleted.
      if( !doc.exists ) return;
      let team = doc.data();
      
      let members = team.members || [];
      let index = members.findIndex(member => member.login === msg.member.login);
      
      if( msg.action === 'added' ) {
        if( index === -1 ) members.push(msg.member);
      } else if( msg.action === 'removed' ) {
        if( index > -1 ) members.splice(index, 1);
      }

      team.members = members;

      return admin.
        firestore()
        .collection(collection)
        .doc(msg.team.slug)
        .set(team)
        .then((writeResult) => {
          return resp.json({result: `Updated team membership: ${msg.team.slug} in ${collection}.`});
        });

    })
}

function onTeamUpdate(collection, msg, resp) {
  if( msg.action === 'deleted' ) {
    return admin.
      firestore()
        .collection(collection)
        .doc(msg.team.slug)
        .delete()
        .then((writeResult) => {
          return resp.json({result: `Deleted team: ${msg.team.slug} in ${collection}.`});
        });
  }

  return admin.
    firestore()
      .collection(collection)
      .doc(msg.team.slug)
      .set(msg.team)
      .then((writeResult) => {
        return resp.json({result: `Updated team: ${msg.team.slug} in ${collection}.`});
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
      body: msg
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
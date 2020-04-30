const model = require('../../models/AuthModel');
const packageModel = require('../../models/PackageModel');
const config = require('../../lib/config');
const logger = require('../../lib/logger');
const utils = require('../utils');
const jwt = require('jsonwebtoken');

function sendError(res, code, msg) {
  res.status(code);
  res.json({error: true, message: msg});
} 

function getUser(req, tryBody=false) {
  // let token be first thing we check
  let token = req.get('Authorization');
  if( token ) {
    try {
      let user = getUserFromJwtToken(token);
      req.session.username = user.username;
      req.session.admin = user.admin;
      return user;
    } catch(e) {}
  }

  if( req.session.username ) {
    return {
      username : req.session.username,
      admin : req.session.admin
    }
  }

  if( tryBody && req.body) {
    let body = req.body;
    // Google Cloud Scheduler sends request as application/octet-stream
    // so body is a buffer :/
    if( req.body instanceof Buffer ) {
      body = req.body.toString('utf8');
    }

    try {
      let user = getUserFromJwtToken(body);
      req.session.username = user.username;
      req.session.admin = user.admin;
      return user;
    } catch(e) {}
  }

  return null;
}

function authenticated(req, res, next) {
  let user = getUser(req);

  if( !user ) {
    sendError(res, 403, 'You must login');
    return false;
  }

  if( next ) next();
  return true;
}

/**
 * @function adminJwtBody
 * @description used by post request from google cloud services to parse 
 * provided jwt
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function adminJwtBody(req, res, next) {
  let user = getUser(req, true);
  if( !user ) return sendError(res, 401, 'You must login');
  if( !user.admin ) return sendError(res, 403, 'Invalid login');
  next();
}

function getUserFromJwtToken(token='') {
  token = token.replace(/^Bearer /, '').trim();
  if( !token ) throw new Error('No token provided');
  return jwt.verify(token, config.server.jwt.secret);
}

async function admin(req, res, next) {
  if( !authenticated(req, res) ) return;

  console.log(req.session);

  if( !req.session.username || !req.session.admin ) {
    return sendError(res, 401, 'Nope.');
  }

  next();
}

async function packageWriteAccess(req, res, next) {
  if( !authenticated(req, res) ) return;

  let pkg;
  if( req.params.package ) {
    try {
      pkg = await packageModel.get(decodeURIComponent(req.params.package));
    } catch(e) {
      return utils.handleError(res, e);
    }
  } else {
    pkg = req.body;
  }
  
  req.ecosmlPackage = pkg;

  // admins are good
  if( req.session.admin ) {
    return next();
  }

  // if this is the owner, they are good
  if( pkg.owner && pkg.owner === req.session.username ) {
    return next();
  }

  if( pkg.organization ) {
    let writeAccess = await model.canWriteOrg(pkg.organization, req.session.username);
    if( !writeAccess ) {
      return sendError(res, 401, 'You do not have write access to this package');
    }
  }

  next();
}

async function packageReadAccess(req, res, next) {
  let pkg;
  try {
    pkg = await packageModel.get(decodeURIComponent(req.params.package));
  } catch(e) {
    return utils.handleError(res, e);
  }

  req.ecosmlPackage = pkg;

  // it's public!
  if( pkg.private !== true ) return next();

  let user = getUser(req) || {};

  // admins are good
  if( user.admin ) {
    return next();
  }

  // it's the owner
  if( pkg.owner && pkg.owner === user.username ) {
    return next();
  }
  
  if( pkg.organization ) {
    let readAccess = await model.canReadOrg(pkg.organization, user.username);
    if( !readAccess ) {
      return sendError(res, 401, 'You do not have read access to this package');
    }
  }

  next();
}

module.exports = {
  sendError,
  authenticated,
  packageReadAccess,
  packageWriteAccess,
  adminJwtBody,
  admin
}
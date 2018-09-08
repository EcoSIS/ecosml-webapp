let model = require('../../models/AuthModel');
let packageModel = require('../../models/PackageModel');
let mongo = require('../../lib/mongo');
let utils = require('../utils');
let AppError = require('../../lib/AppError');



function sendError(res, code, msg) {
  res.status(code);
  res.json({error: true, message: msg});
} 

function authenticated(req, res, next) {
  if( !req.session.username ) {
    sendError(res, 401, 'You must login');
    return false;
  }

  if( next ) next();
  return true;
}


async function admin(req, res, next) {
  if( !authenticated(req, res) ) return;

  if( !req.session.username ) {
    return sendError(res, 401, 'Nope.');
  }

  next();
}

async function packageWriteAccess(req, res, next) {
  if( !authenticated(req, res) ) return;

  let pkg;
  if( req.params.package ) {
    try {
      pkg = await packageModel.get(req.params.package);
    } catch(e) {
      return utils.handleError(res, e);
    }
  } else {
    pkg = req.body;
  }
  
  req.ecosmlPackage = pkg;

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
    pkg = await packageModel.get(req.params.package);
  } catch(e) {
    return utils.handleError(res, e);
  }

  req.ecosmlPackage = pkg;

  // it's public!
  if( pkg.private !== true ) return next();

  // it's the owner
  if( pkg.owner && pkg.owner === req.session.username ) {
    return next();
  }
  
  if( pkg.organization ) {
    let readAccess = await model.canReadOrg(pkg.organization, pkg.owner);
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
  admin
}
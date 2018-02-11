let model = require('../../models/AuthModel');
let mongo = require('../../lib/mongo');
let utils = require('../utils');
let AppError = require('../../lib/AppError');

class AuthMiddleware {

  sendError(res, code, msg) {
    res.status(code);
    res.json({error: true, message: msg});
  } 

  authenticated(req, res, next) {
    if( !req.session.username ) {
      this.sendError(res, 401, 'You must login');
      return false;
    }

    if( next ) next();
    return true;
  }

  async packageWriteAccess(req, res, next) {
    if( !this.authenticated(req, res) ) return res.send(403);

    let pkg;
    if( req.params.package ) {
      try {
        pkg = await model.get(req.params.package);
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
        return this.sendError(res, 403, 'You do not have write access to this package');
      }
    }

    next();
  }

  async packageReadAccess(req, res, next) {
    try {
      pkg = await model.get(req.params.package);
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
        return this.sendError(res, 403, 'You do not have read access to this package');
      }
    }

    next();
  }

}

module.exports = new AuthMiddleware();
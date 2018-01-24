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

  async canWritePackage(pkg, req, res) {
    if( !this.authenticated(req, res) ) return false;

    if( typeof pkg === 'string' ) {
      pkg = await mongo.getPackage(pkg);
      if( !pkg ) {
        let e = new AppError('Unknown package name or id', AppError.ERROR_CODES.INVALID_ATTRIBUTE);
        utils.handleError(res, e);
        return false;
      }
    }

    if( pkg.owner === req.session.username ) return true;

    if( pkg.organization ) {
      let writeAccess = await model.canWriteOrg(pkg.organization, req.session.username);
      if( !writeAccess ) {
        this.sendError(res, 403, 'You do not have write access to this group');
        return false;
      }
    }

    return true;
  }

  async canReadPackage(pkg, req, res) {
    if( typeof pkg === 'string' ) {
      pkg = await mongo.getPackage(pkg);
    }

    if( !pkg.private ) return true;

    if( pkg.owner === req.session.username ) return true;
    
    if( pkg.organization ) {
      let writeAccess = await model.canReadOrg(pkg.organization, pkg.owner);
      if( !writeAccess ) {
        this.sendError(res, 403, 'You do not have write access to this group');
        return false;
      }
    }

    return true;
  }

}

module.exports = new AuthMiddleware();
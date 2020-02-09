const router = require('express').Router();
const model = require('../models/DoiModel');
const mongo = require('../lib/mongo');
const config = require('../lib/config');
const utils = require('./utils');
const fs = require('fs-extra');
const path = require('path');
const {admin, packageWriteAccess, packageReadAccess} = require('./middleware/auth');

const DOI_REGEX = new RegExp(`((ark|doi):)?${config.doi.shoulder}/[a-zA-Z0-9\.]+`);

router.post('/request/:package/:version', packageWriteAccess, async (req, res) => {
  let pkg = req.ecosmlPackage;
  let version = req.params.version;

  let release = (pkg.releases || []).find(release => release.name === version);
  if( !release ) {
    return utils.handleError(res, new Error('Unknown package version: '+version));
  }

  try {
    await model.request(pkg, version, req.session.username, req.session.email);
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/:version/cancel', admin, packageWriteAccess, async(req, res) => {
  let pkg = req.ecosmlPackage;
  let version = req.params.version;

  try {
    res.json(await model.cancelRequest(pkg, version, req.session.username));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/:version/update', admin, packageWriteAccess, async(req, res) => {
  let pkg = req.ecosmlPackage;
  let version = req.params.version;
  let msg = req.body;
  if( typeof msg === 'object' && Object.keys(msg).length === 0 ) {
    msg = '';
  }

  try {
    res.json(await model.requestUpdates(pkg, version, req.session.username, msg));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/:version/approve', admin, packageWriteAccess, async(req, res) => {
  let pkg = req.ecosmlPackage;
  let version = req.params.version;

  try {
    res.json(await model.mint(pkg, version, req.session.username));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/search', admin, async (req, res) => {
  let type = req.query.type || '';
  let text = req.query.text || '';

  try {
    res.json(await model.searchDois({state:type, text}));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/pending', admin, async(req, res) => {
  try {
    res.json(await model.getPendingDois());
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/all/:package', packageWriteAccess, async(req, res) => {
  try {
    res.json(await model.getPackageDois(req.ecosmlPackage.id));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/approved', admin, async(req, res) => {
  try {
    res.json(await model.getApprovedDois());
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/download/:package/:tag', packageReadAccess, async (req, res) => {
  try {
    let sPath = await model.getSnapshotPath(req.ecosmlPackage, req.params.tag);
    let filename = path.parse(sPath).base;

    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    fs.createReadStream(sPath).pipe(res);
  } catch(e) {
    utils.handleError(res, e);
  }
});

/**
 * Resolve doi requests with 302 redirect
 */
function doiResolver(app) {
  app.get(/^\/(doi):.*/, handleDoiRequest);
  app.get(new RegExp('^'+config.doi.shoulder+'.*'), handleDoiRequest);
  app.get(/^\/package\/(doi):.*/, handleDoiRequest);
  app.get(new RegExp('^\/package\/'+config.doi.shoulder+'.*'), handleDoiRequest);
}

async function handleDoiRequest(req, res) {
  // split apart id, type and suffix from url
  let info = req.url.split(DOI_REGEX);

  info = {
    doi : req.url.match(DOI_REGEX)[0].replace(/^(ark|doi):/, ''),
    type : info[1],
    suffix : info[2]
  }

  let pkg = await mongo.getPackage(info.doi);
  if( pkg === null ) {
    return res.status(404).send(`Unknown ${info.type} identifier: ${info.doi}`);
  }

  return res.redirect('/package/'+pkg.name);
}

module.exports = {router, doiResolver};
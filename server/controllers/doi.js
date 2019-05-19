const router = require('express').Router();
const model = require('../models/DoiModel');
const {admin, packageWriteAccess} = require('./middleware/auth');

const DOI_REGEX = /(ark|doi):\/?[a-zA-Z0-9\.]+\/[a-zA-Z0-9\.]+/;


router.get('/request/:package/:version', packageWriteAccess, async (req, res) => {
  let pkg = req.ecosmlPackage;
  let version = req.params.version;

  let release = (pkg.releases || []).find(release => release.name === version);
  if( !release ) {
    return utils.handleError(res, new Error('Unknown package version: '+version));
  }

  try {
    await model.request(pkg, version, req.session.username);
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/:version/reject', admin, async(req, res) => {
  let pkg = req.ecosmlPackage;
  let release = (pkg.releases || []).find(release => release.name === version);

  try {
    await model.rejectRequest(pkg, req.session.username);
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/update', admin, async(req, res) => {
  let pkg = req.ecosmlPackage;
  let msg = req.body;

  try {
    await model.requestUpdates(pkg, req.session.username, msg);
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/request/:package/approve', admin, async(req, res) => {
  let pkg = req.ecosmlPackage;

  try {
    await model.requestUpdates(pkg, req.session.username);
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/search', admin, async (req, res) => {
  let type = req.query.type || '';
  let text = req.query.text || '';

  try {
    res.json(await model.searchDois({type, text}));
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/pending', admin, async(req, res) => {
  try {
    res.json(await model.getPendingDois());
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.put('/approved', admin, async(req, res) => {
  try {
    res.json(await model.getApprovedDois());
  } catch(e) {
    utils.handleError(res, e);
  }
});

/**
 * Resolve doi requests with 302 redirect
 */
function doiResolver(app) {
  app.get(/^\/(ark|doi):*/, handleDoiRequest);
}

async function handleDoiRequest(req, res) {
  // split apart id, type and suffix from url
  let info = req.url.split(DOI_REGEX);
  info = {
    doi : req.url.match(DOI_REGEX)[0].replace(/^(ark|doi):/, ''),
    type : info[1],
    suffix : info[2]
  }

  let id = await model.getIdFromDoi(info.doi);
  if( id === null ) {
    return res.status(404).send(`Unknown ${info.type} identifier: ${info.doi}`);
  }

  return res.redirect('/package/'+id);
}

module.exports = {router, doiResolver};
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/' 
});
const model = require('../models/PackageModel');
const middleware = require('./middleware/auth');
const utils = require('./utils');
const AppError = require('../lib/AppError');

router.post('/', async (req, res) => {
  let pkg = req.body || {};

  pkg.owner = req.session.username;

  let writeAccess = await middleware.canWritePackage(pkg, req, res);
  if( !writeAccess ) return;

  try {
    pkg = await model.create(pkg);
    res.status(201).json(pkg);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/:name', async(req, res) => {
  let packageName = req.params.name;
  if( !packageName ) {
    let e = new AppError('Package name or id required. /api/package/:name', AppError.ERROR_CODES.MISSING_ATTRIBUTE)
    return utils.handleError(res, e);
  }

  let readAccess = await middleware.canReadPackage(packageName, req, res);
  if( !readAccess ) return;

  try {
    let package = await model.get(packageName);
    res.json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.patch('/:name', async(req, res) => {
  let packageName = req.params.name;
  if( !packageName ) {
    let e = new AppError('Package name or id required. /api/package/:name', AppError.ERROR_CODES.MISSING_ATTRIBUTE)
    return utils.handleError(res, e);
  }

  let update = req.body;

  try {
    let writeAccess = await middleware.canWritePackage(packageName, req, res);
    if( !writeAccess ) return;

    package = await model.update(update.pkg, update.msg);
    res.json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:name', async (req, res) => {
  let packageName = req.params.name;
  if( !packageName ) {
    let e = new AppError('Package name required. /api/package/:name', AppError.ERROR_CODES.MISSING_ATTRIBUTE)
    return utils.handleError(res, e);
  }

  try {
    let writeAccess = await middleware.canWritePackage(packageName, req, res);
    if( !writeAccess ) return;
  
    await model.delete(packageName);
    res.status(204);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/:name/createRelease', async (req, res) => {
  let releaseInfo = req.body;
  let packageName = req.params.name;

  let writeAccess = await middleware.canWritePackage(packageName, req, res);
  if( !writeAccess ) return;
  
  try {
    package = await model.createRelease(packageName, releaseInfo);
    res.status(201).json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/:name/addFile', upload.any(), async (req, res) => {
  let writeAccess = await middleware.canWritePackage(packageName, req, res);
  if( !writeAccess ) return;

  if( req.files.length === 0 ) {
    return res.status(400).send({error: true, message: 'no file provided'});
  }

  var packageName = req.get('X-Package-Name');
  var message = req.get('X-Commit-Message');
  var file = req.files[0];

  await model.addFile({
    filename : file.filename,
    buffer : file.buffer,
    packageName, message
  });
});

module.exports = router;
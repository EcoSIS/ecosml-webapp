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
    package = await model.create(package);
    res.status(201).json(package);
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

    package = await model.update(update);
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
  let packageName = req.params.name;

  let writeAccess = await middleware.canWritePackage(packageName, req, res);
  if( !writeAccess ) return;

  // req.files is array of `photos` files 
  // req.body will contain the text fields, if there were any 

  await model.addFile(req.user, {
    filename : req.file.filename,
    filepath : req.file.destination,
    packageName : req.body.packageName,
    packagePath : req.body.packagePath
  })
});

module.exports = router;
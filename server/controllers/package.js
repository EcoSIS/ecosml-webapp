const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/' 
});
const model = require('../models/PackageModel');
const {packageWriteAccess, packageReadAccess} = require('./middleware/auth');
const utils = require('./utils');
const AppError = require('../lib/AppError');

router.post('/', packageWriteAccess, async (req, res) => {
  let pkg = req.ecosmlPackage;
  pkg.owner = req.session.username;

  try {
    pkg = await model.create(pkg);
    res.status(201).json(pkg);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/:package', packageReadAccess, async(req, res) => {
  try {
    let package = await model.get(req.ecosmlPackage);
    res.json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.patch('/:package', packageWriteAccess, async(req, res) => {
  try {
    package = await model.update(req.ecosmlPackage, req.body.update, req.body.message);
    res.json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:package', packageWriteAccess, async (req, res) => {
  try {  
    await model.delete(req.ecosmlPackage);
    res.status(204);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/:package/createRelease', packageWriteAccess, async (req, res) => {
  try {
    package = await model.createRelease(req.ecosmlPackage, req.body);
    res.status(201).json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/:package/updateFile', packageWriteAccess, upload.any(), async (req, res) => {
  if( req.files.length === 0 ) {
    return res.status(400).send({error: true, message: 'no file provided'});
  }

  let message = req.body.message;
  let dir = req.body.dir;
  var file = req.files[0];

  let response = await model.addFile(
    req.ecosmlPackage,
    {
      filename : path.parse(file.filename).base,
      buffer : file.buffer,
      dir, message
    }
  );

  res.send(response);
});

router.delete('/:package/file/*', packageWriteAccess, async (req, res) => {
  let file = req.url.replace('/'+req.params.package+'/file', '');

  try {
    await model.deleteFile(req.ecosmlPackage, file);
    res.status(204);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/:package/files', packageReadAccess, async (req, res) => {
  try {
    let files = await model.getFiles(req.ecosmlPackage);
    res.json({
      package: req.ecosmlPackage.name,
      files : files
    });
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
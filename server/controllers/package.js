const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const uploadPath = path.join(__dirname, '..', 'uploads');
const upload = multer({ 
  dest: uploadPath
});
const model = require('../models/PackageModel');
const queue = require('../models/PackageQueueModel')
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
    // queue replaces:
    // package = await model.update(req.ecosmlPackage, req.body.update, req.body.message);
    let package = await queue.add(
      'update', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, req.body.update, req.body.message]
    );
    
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

  let data = {
    filename : file.originalname,
    tmpFile : file.path,
    dir, message
  }
  
  try {
    // queue replaces:
    // let response = await model.addFile(req.ecosmlPackage, data);
    let response = await queue.add(
      'addFile', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, data]
    );

    res.send(response);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:package/file/*', packageWriteAccess, async (req, res) => {
  let file = req.url.replace('/'+req.params.package+'/file', '');
  file = decodeURI(file);

  try {
    // queue replaces:
    // await model.deleteFile(req.ecosmlPackage, file);
    await queue.add(
      'deleteFile', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, file]
    );
    
    res.status(204).send();
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

router.move('/:package/example/:name', packageWriteAccess, async (req, res) => {
  try {
    // await model.moveExample(req.ecosmlPackage, req.params.name, req.body);
    await queue.add(
      'moveExample', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, req.params.name, req.body]
    );

    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:package/example/:name', packageWriteAccess, async (req, res) => {
  try {
    // await model.deleteExample(req.ecosmlPackage, req.params.name);
    await queue.add(
      'deleteExample', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, req.params.name]
    );

    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');

const uploadPath = path.join(__dirname, '..', 'uploads');
const upload = multer({ 
  dest: uploadPath
});
const model = require('../models/PackageModel');
const queue = require('../models/PackageQueueModel');
const {packageWriteAccess, packageReadAccess} = require('./middleware/auth');
const utils = require('./utils');
const AppError = require('../lib/AppError');

router.post('/', packageWriteAccess, async (req, res) => {
  let pkg = req.ecosmlPackage;
  pkg.owner = req.session.username;

  try {
    pkg = await model.create(pkg, req.session.username);
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
      [req.ecosmlPackage, req.body.update, req.body.message, req.session.username]
    );
    
    res.json(package);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:package', packageWriteAccess, async (req, res) => {
  try {  
    await model.delete(req.ecosmlPackage);
    res.status(204).send();
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

router.get('/available/:host/:package', async(req, res) => {
  try {
    let isAvailable = await model.isNameAvailable(req.params.host, req.params.package, req.query.org);
    isAvailable.host = req.params.host;
    isAvailable.packageName = req.params.package;
    
    res.json(isAvailable);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/:package/updateFiles', packageWriteAccess, upload.any(),  async (req, res) => {
  try {
    let remove = JSON.parse(req.body.remove || '[]');
    if( req.files.length === 0 && remove.length === 0) {
      return res.status(400).send({error: true, message: 'no file provided'});
    }

    let message = req.body.message;
    let dir = req.body.dir;

    let files = [];
    for( var i = 0; i < req.files.length; i++ ) {
      files.push({
        repoFilePath : req.files[i].fieldname,
        tmpFile : req.files[i].path
      })
    }

    let response = await queue.add(
      'updateFiles', 
      req.ecosmlPackage.name, 
      [req.ecosmlPackage, files, remove, message, req.session.username]
    );

    res.send(response);

  } catch(e) {
    utils.handleError(res, e);

    // attempt to cleanup
    for( var i = 0; i < req.files.length; i++ ) {
      if( fs.existsSync(req.files[i].path) ) {
        await fs.unlink(req.files[i].path);
      }
    }
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

router.get('/:package/syncRegProps', packageWriteAccess, async (req, res) => {
  try {
    res.json(await model.syncRegisteredRepository(req.ecosmlPackage));
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
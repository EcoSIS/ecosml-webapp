const router = require('express').Router();
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/' 
});
const model = require('../models/RepoModel');
const utils = require('./utils');
const AppError = require('../lib/AppError');

router.post('/', async (req, res) => {
  let repo = req.body;
  
  // TODO
  // repo.owner = req.user.username;
  repo.owner = 'bob';
  repo.organization = 'myorg';

  try {
    repo = await model.create(repo);
    console.log('here');
    res.sendStatus(201).json(repo);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/:name', async(req, res) => {
  let repoName = req.params.name;
  if( !repoName ) {
    let e = new AppError('Repository name or id required. /repo/:name', AppError.ERROR_CODES.MISSING_ATTRIBUTE)
    return utils.handleError(res, e);
  }

  try {
    let repo = await model.get(repoName);
    res.json(repo);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.delete('/:name', async (req, res) => {
  let repoName = req.params.name;
  if( !repoName ) {
    let e = new AppError('Repository name required. /repo/:name', AppError.ERROR_CODES.MISSING_ATTRIBUTE)
    return utils.handleError(res, e);
  }

  try {
    await model.delete(repoName);
    res.sendStatus(204);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/addFile', upload.any(), async (req, res) => {
  // req.files is array of `photos` files 
  // req.body will contain the text fields, if there were any 

  await model.addFile(req.user, {
    filename : req.file.filename,
    filepath : req.file.destination,
    repoName : req.body.repoName,
    repoPath : req.body.repoPath
  })
});

module.exports = router;
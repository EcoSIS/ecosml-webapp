const router = require('express').Router();
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/' 
});
const model = require('../models/RepoModel');

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

router.post('/create', async (req, res) => {
  
});

router.delete('/delete', async (req, res) => {

});

module.exports = router;
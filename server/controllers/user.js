const router = require('express').Router();
const model = require('../models/AuthModel');
const utils = require('./utils');
const {authenticated} = require('./middleware/auth');

router.post('/githubInfo', authenticated, async (req, res) => {
  try {
    if( !req.body ) throw new Error('Body required');

    console.log(req.user);

    let result;
    if( req.body.username ) {
      result = await model.linkGithubUsername(req.session.username, req.body.username);
    } else {
      result = await model.unlinkGithubUsername(req.session.username);
    }

    res.json({success: true, result});
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
const router = require('express').Router();
const ckan = require('../lib/ckan');
const utils = require('./utils');
const {authenticated} = require('./middleware/auth');

router.post('/githubInfo', authenticated, async (req, res) => {
  try {
    if( !req.body ) throw new Error('Body required');

    let result = ckan.setGithubInfo(req.body.username, req.user.username);
    res.json(result);
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
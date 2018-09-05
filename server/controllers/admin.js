const router = require('express').Router();
const mongo = require('../lib/mongo');
const {admin} = require('./middleware/auth');
const utils = require('./utils');

router.get('/recreate-indexes', admin, async (req, res) => {
  let pkgs = await mongo.recreatePackageIndexes();
  let githubTeams = await mongo.recreateGithubTeamIndexes();
  res.json({pkgs, githubTeams});
});

router.get('/recreate-stats', admin, async(req, res) => {
  try {
    await mongo.updateStats();
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
})

module.exports = router;
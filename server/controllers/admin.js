const router = require('express').Router();
const mongo = require('../lib/mongo');
const {admin} = require('./middleware/auth');

router.get('/recreate-indexes', admin, async (req, res) => {
  let pkgs = await mongo.recreatePackageIndexes();
  let githubTeams = await mongo.recreateGithubTeamIndexes();
  res.json({pkgs, githubTeams});
});

module.exports = router;
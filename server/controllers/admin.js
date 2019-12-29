const router = require('express').Router();
const mongo = require('../lib/mongo');
const {admin} = require('./middleware/auth');
const utils = require('./utils');
const regRepos = require('../lib/registered-repositories');

router.get('/recreate-indexes', admin, async (req, res) => {
  res.json(await mongo.recreateIndexes());
});

router.get('/recreate-stats', admin, async(req, res) => {
  try {
    await mongo.updateStats();
    res.json({success: true});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/reg-repo/backup', admin, async (req, res) => {
 try {
  res.json(await regRepos.backupAll());
 } catch(e) {
   utils.handleError(res, e);
 }
});

module.exports = router;
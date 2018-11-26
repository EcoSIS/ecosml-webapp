const router = require('express').Router();
const ecosis = require('../lib/sync/ecosis');
const github = require('../lib/sync/github');
const utils = require('./utils');
const regRepos = require('../lib/registered-repositories');
const {admin, adminJwtBody} = require('./middleware/auth');

router.get('/ecosis', admin, async (req, res) => {
  try {
    let orgs = await ecosis.syncOrgs();
    res.json({success: true, orgs});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/repo/:name', admin, async (req, res) => {
  try {
    let resp = await github.syncRepo(req.params.name);
    res.json({success: true, resp});
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.get('/reg-repos', adminJwtBody, SyncRegRepos);
router.post('/reg-repos', adminJwtBody, SyncRegRepos);
async function SyncRegRepos(req, res) {
  try {
   res.json(await regRepos.syncAllPropertiesToMongo());
  } catch(e) {
    utils.handleError(res, e);
  }
}

module.exports = router;
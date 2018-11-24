const router = require('express').Router();
const ecosis = require('../lib/sync/ecosis');
const github = require('../lib/sync/github');
const {admin, adminJwtBody} = require('./middleware/auth');

router.get('/ecosis', admin, async (req, res) => {
  try {
    let orgs = await ecosis.syncOrgs();
    res.json({success: true, orgs});
  } catch(error) {
    res.json({error: true, error});
  }
});

router.get('/repo/:name', admin, async (req, res) => {
  try {
    let resp = await github.syncRepo(req.params.name);
    res.json({success: true, resp});
  } catch(error) {
    res.json({error: true, error});
  }
});

router.get('/reg-repos', adminJwtBody, async (req, res) => {
  try {
   res.json(await regRepos.syncAllPropertiesToMongo());
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
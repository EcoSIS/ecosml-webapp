const router = require('express').Router();
const ecosis = require('../lib/sync/ecosis');
const {admin} = require('./middleware/auth');

router.get('/ecosis', admin, async (req, res) => {
  let orgs = await ecosis.syncOrgs();
  res.json({success: true, orgs});
});

module.exports = router;
const router = require('express').Router();
const mongo = require('../lib/mongo');
const utils = require('./utils');
const redis = require('../lib/redis');

router.get('/', async (req, res) => {
  try {
    let result = (await mongo.getStats())[0].value;
    for( let key in result ) {
      result[key] = limit(result[key]);
    }

    for( let org of result.organizations ) {
      org.displayName = await redis.getOrgDisplayNameFromName(org.key);
    }

    res.json(result);
  } catch(e) {
    utils.handleError(res, e);
  }
});

function limit(arr) {
  arr.sort((a, b) => {
    if( a.count > b.count ) return -1;
    if( a.count < b.count ) return 1;
    return 0;
  });
  return arr.slice(0, 10);
}

module.exports = router;
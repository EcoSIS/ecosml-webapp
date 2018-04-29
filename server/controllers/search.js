const router = require('express').Router();
const model = require('../models/SearchModel');
const utils = require('./utils');
const {admin} = require('./middleware/auth');

router.get('/recreateIndex', admin, async (req, res) => {
  try {
    let result = await model.recreateIndex();
    res.json(result);
  } catch(e) {
    utils.handleError(res, e);
  }
});

router.post('/', search);
router.get('/', search);

async function search(req, res) {
  try {
    let query = {};
    if( req.method === 'POST'  ) {
      query = req.body;
    } else {
      query = req.query;
      if( query.filters ) {
        query.filters = JSON.parse(query.filters);
      }
      if( query.offset ) {
        query.offset = parseInt(query.offset);
      }
      if( query.limit ) {
        query.limit = parseInt(query.limit);
      }
      if( query.sort ) {
        query.sort = JSON.parse(query.sort);
      }
    }

    results = await model.search(query);
    res.json(results);
  } catch(e) {
    utils.handleError(res, e);
  }
}

module.exports = router;
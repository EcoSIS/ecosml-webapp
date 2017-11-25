const router = require('express').Router();
const model = require('../models/SearchModel');
const utils = require('./utils');

router.get('/recreateIndex', async (req, res) => {
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
    let params;
    if( req.method === 'POST'  ) {
      params = req.body;
    } else {
      params = req.query;
      if( params.query ) {
        params.query = JSON.parse(params.query);
      }
      if( params.offset ) {
        params.offset = parseInt(params.offset);
      }
      if( params.limit ) {
        params.limit = parseInt(params.limit);
      }
      if( params.sort ) {
        params.sort = JSON.parse(params.sort);
      }
      if( params.projection ) {
        params.projection = JSON.parse(params.projection);
      }
    }

    let query = params.query || {};
    if( !query.$text && params.text ) {
      query.$text = {
        $search : params.text
      }
    }

    let options = {
      offset : params.offset || 0,
      limit : params.limit || 100,
      sort : params.sort || {name: 1}
    }

    results = await model.search(query, options, params.projection);
    res.json(results);
  } catch(e) {
    utils.handleError(res, e);
  }
}

module.exports = router;
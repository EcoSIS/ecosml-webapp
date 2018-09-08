const router = require('express').Router();
const model = require('../models/SearchModel');
const utils = require('./utils');
const {admin, authenticated} = require('./middleware/auth');

router.get('/recreateIndex', admin, async (req, res) => {
  try {
    let result = await model.recreateIndex();
    res.json(result);
  } catch(e) {
    utils.handleError(res, e);
  }
});

// router.get('/reindexRepositories', admin, async (req, res) => {
//   try {
//     let result = await model.reindexRepositories();
//     res.json(result);
//   } catch(e) {
//     utils.handleError(res, e);
//   }
// });

router.post('/', search);
router.get('/', search);

router.post('/owner', authenticated, searchOwner);
router.get('/owner', authenticated, searchOwner);

async function search(req, res) {
  try {
    let query = getQuery(req);
    results = await model.publicSearch(query);
    res.json(results);
  } catch(e) {
    utils.handleError(res, e);
  }
}

async function searchOwner(req, res) {
  try {
    let query = getQuery(req);
    if( !query.filters ) query.filters = [];
    query.filters.push({owner: req.session.username});

    results = await model.search(query);
    res.json(results);
  } catch(e) {
    utils.handleError(res, e);
  }
}

function getQuery(req) {
  if( req.method === 'POST'  ) {
    return req.body;
  }

  let query = req.query;
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
  return query;
}

module.exports = router;
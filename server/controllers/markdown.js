const router = require('express').Router();
const markdown = require('../lib/markdown');
const utils = require('./utils');

router.post('/', async (req, res) => {
  try {
    let html = await markdown(req.body);
    res.set('content-type', 'text/html')
       .send(html);
  } catch(e) {
    utils.handleError(res, e);
  }
});

module.exports = router;
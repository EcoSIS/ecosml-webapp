const router = require('express').Router();

router.use('/package', require('./package'));

module.exports = router;
const router = require('express').Router();

router.use('/package', require('./package'));
router.use('/search', require('./search'));

module.exports = router;
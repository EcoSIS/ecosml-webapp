const router = require('express').Router();

router.use('/package', require('./package'));
router.use('/search', require('./search'));
router.use('/markdown', require('./markdown'));

module.exports = router;
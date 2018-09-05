const router = require('express').Router();

router.use('/package', require('./package'));
router.use('/search', require('./search'));
router.use('/markdown', require('./markdown'));
router.use('/sync', require('./sync'));
router.use('/admin', require('./admin'));
router.use('/stats', require('./stats'));

module.exports = router;
const router = require('express').Router();


router.use('/cart', require('./cart'))
router.use('/auth', require('./auth'))

router.use('*', (req, res, next) => {
	const err = new Error('Page not found');
	err.status = 404;
	next(err);
})

module.exports = router;
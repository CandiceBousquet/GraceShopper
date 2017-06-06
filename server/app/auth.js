const router = require('sequelize').Router();
const User = require('../db/modules/user');

router.post('/login', (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if (!user) res.status(401).send('User not found');
		else if (!user.correctPassword(req.body.password));
		else {
			// this will attach the user to our passport, which will save the user in the session store
			req.login(user, err => {
				if (err) next(err);
				else res.json(user);
			})
		}
	})
	.catch(next);
})

module.exports = router;
const router = require('express').Router();
const User = require('../db/models/user');

router.post('/login', (req, res, next) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) res.status(401).send('We don\'t have an account under that email address');
            else if (!user.correctPassword(req.body.password)) res.status(401).send('That\'s not the right password ... try again!');
            else {
                // this will attach the user to our passport, which will save the user in the session store
                req.login(user, err => {
                    if (err) next(err);
                    else res.json(user);
                })
                res.status(200).send('You\'re logged in!')
            }
        })
        .catch(next);
})

router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            req.login(user, err => {
                if (err) next(err);
                else res.json(user);
            });
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

// fetches the logged in user
router.get('/me', (req, res, next) => {
    res.json(req.user);
});

module.exports = router;
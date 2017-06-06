const router = require('Sequelize').Router();
const passport = require('passport');
const User = require('../db/models/user');

router.use(passport.initialize());
router.use(passport.session());

// stores user's id in the session store upon login
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

// runs when a user has already initiated a session and we want to re-obtain user info from the db
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = router;

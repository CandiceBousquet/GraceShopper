const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const models = require('./db');
const db = models.db;
const User = models.User;
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCodes = require('../google_api');

// logging
app.use(require('volleyball'));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sessions

// the session store will save current sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

// creates session table
dbStore.sync();

app.use(session({
    secret: process.env.SESSION_SECRET || 'candice is cool',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));

passport.use(
  new GoogleStrategy({
    clientID: googleCodes.clientID,
    clientSecret: googleCodes.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
      
      User.findOrCreate({
        where:{
          name:profile.displayName,
          email:profile.emails[0].value
        }
      })
      .then((createdUser) =>{
        done();
      })
     
 
  })
);
app.get('/auth/google', passport.authenticate('google', { scope:'email'}));



app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/' 
  }))

app.use(require('./app/passport'));


// routing
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/api', require('./api'));
app.use('/auth', require('./app/auth'));
app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'..','/index.html'));
});

// error handling
app.use('/', (err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    res.send(message).status(status);
});






module.exports = app;





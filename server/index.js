const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const models = require('./db');
const db = models.db;
const User = models.User;
const session = require('express-session');

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

// passport makes it easier to identify users
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

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

// routing
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', require('./api'));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// error handling
app.use('/', (err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    res.send(message).status(status);
});

db.sync({
    // force: true
}).then(() => {
    app.listen(1337, () => {
        console.log('listening on port 1337');
    });
}).catch(console.error.bind(this));
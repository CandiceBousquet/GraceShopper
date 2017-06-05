const Sequelize = require('Sequelize');

// if using Heroku Postgres, use process.env.DATABASE_URL
const db = new Sequelize('postgres://localhost:5432/Boilermaker', {
	logging: false
});

module.exports = db;

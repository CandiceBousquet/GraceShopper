const Sequelize = require('sequelize');

// if using Heroku Postgres, use process.env.DATABASE_URL
const databaseUrl = (process.env.NODE_ENV === 'production') ? 'postgres://localhost:5432/GraceShopper' : "postgres://localhost:5432/GraceShopper";

const db = new Sequelize(databaseUrl, {
	logging: false
});

module.exports = db;

const Sequelize = require('Sequelize');
const db = require('../_db');

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Category;

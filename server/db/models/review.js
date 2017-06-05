const Sequelize = require('Sequelize');
const db = require('../_db');

const Review = db.define('review', {
	content: {
		type: Sequelize.TEXT
	}
});

module.exports = Review;
const Sequelize = require('Sequelize');
const db = require('../_db');

const Page = db.define('page', {
	title: {
		type: Sequelize.STRING
	}
});

module.exports = Page;
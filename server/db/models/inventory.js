const Sequelize = require('Sequelize');
const db = require('../_db');

const Inventory = db.define('inventory', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		validate: {
			min: 0
		}
	}
});

module.exports = Inventory;

const Sequelize = require('Sequelize');
const db = require('../_db');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING
	}
}, {
	instanceMethods: {
		correctPassword: function (candidatePassword) {

		}
	},
	classMethods: {
		generateSalt: function () {

		},
		encryptPassword: function (plainText, salt) {

		}
	},
	hooks: {
		beforeCreate: setSaltAndPassword,
		beforeUpdate: setSaltAndPassword
	}
});

function setSaltAndPassword (user) {
	
}

module.exports = User;
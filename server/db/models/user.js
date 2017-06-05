const Sequelize = require('Sequelize');
const db = require('../_db');

const User = db.define('user', {
	name: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	salt: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			unique: true
		}
	},
	address: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	state: {
		type: Sequelize.STRING
	},
	zipcode: {
		type: Sequelize.STRING // validation needed
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
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
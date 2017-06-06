const Sequelize = require('Sequelize');
const db = require('../_db');
const crypto = require('crypto');

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
            isEmail: true
                // unique: true
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
        correctPassword: function(candidatePassword) {
            const encryptedPassword = User.encryptPassword(candidatePassword, this.salt);
            return encryptedPassword === this.password;
        }
    },
    classMethods: {
        generateSalt: function() {
            crypto.randomBytes('256', function(err, buf) {
                if (err) throw err;
                return buf;
            })
        },
        encryptPassword: function(plainText, salt) {
            return crypto.createHmac('sha512', salt).digest('base64'); // is this async?
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

function setSaltAndPassword(user) {
    const salt = User.generateSalt;
    const encryptedPassword = User.encryptPassword(user.password, salt);
    user.password = encryptedPassword;
}

module.exports = User;
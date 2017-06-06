const Sequelize = require('Sequelize');
const db = require('../_db');

const Order = db.define('order', {
    submitted: {
        type:Sequelize.BOOLEAN,
        default: false
    }
});

module.exports = Order;
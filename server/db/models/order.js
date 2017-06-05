const Sequelize = require('Sequelize');
const db = require('../_db');

const Order = db.define('order', {});

module.exports = Order;
const Sequelize = require('Sequelize');
const db = require('../_db');

const Order = db.define('order', {
    submitted: {
        type:Sequelize.BOOLEAN,
        default: false
    }
});

// Need to add an on destroy hook to increment items associated with that order
module.exports = Order;
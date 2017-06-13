const Sequelize = require('sequelize');
const db = require('../_db');
const Item = require('./item');

const Order = db.define('order', {
    submitted: {
        type:Sequelize.BOOLEAN,
        default: false
    }
}, {
	defaultScope: {
        include: [{
        	model: Item
        }]
    },
    getterMethods: {
    	totalPrice() {
    		let total = 0;
            if (this.items) {
                total = this.items.reduce((sum, item) => sum+=item.price, total);
            }
            return total;
    	}
    }
});

// Need to add an on destroy hook to increment items associated with that order
module.exports = Order;
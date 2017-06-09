const Sequelize = require('Sequelize');
const db = require('../_db');

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER,
        get() {
            return this.getDataValue('price') / 100;
        },
        set() {
            return this.setDataValue('price') * 100;
        },
        defaultValue: 100
            // allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    imageUrl: {
        type: Sequelize.STRING // may need hook with full path to image
    }
}, {
    instanceMethods: {
        incrementQuantity: function(num) {
            return this.update({
                quantity: this.quantity + num
            });
        },
        decrementQuantity: function(num) {
            if (this.quantity - num < 0) {
                throw new Error("Item is Sold Out");
            } else {
                return this.update({
                    quantity: this.quantity - num
                });
            }
        }
    }
});

module.exports = Item;
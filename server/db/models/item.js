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
    imageUrl: {
        type: Sequelize.STRING // may need hook with full path to image
    }
});

module.exports = Item;
const Sequelize = require('Sequelize');
const db = require('../_db');

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT
    },

    rating: {
        type: Sequelize.ENUM('*', '**', '***', '****', '*****')
        // defaultValue: null
    }
});

module.exports = Review;
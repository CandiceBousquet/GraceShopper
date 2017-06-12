const Sequelize = require('sequelize');
const db = require('../_db');

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT
    },

    rating: {
        type: Sequelize.ENUM('*', '**', '***', '****', '*****')
    }
});

module.exports = Review;
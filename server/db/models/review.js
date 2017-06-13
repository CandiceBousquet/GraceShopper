const Sequelize = require('sequelize');
const db = require('../_db');

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT
    },

    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    }
});

module.exports = Review;

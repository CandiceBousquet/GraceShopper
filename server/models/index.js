const db = require('./_db');
const User = require('./user');
const Page = require('./page');

Page.belongsTo(User, { as: 'author' });

module.exports = {
	db,
	User,
	Page
};

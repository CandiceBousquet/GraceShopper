const db = require('./_db');
const User = require('./models/user');
const Page = require('./models/page');

Page.belongsTo(User, { as: 'author' });

module.exports = {
	db,
	User,
	Page
};

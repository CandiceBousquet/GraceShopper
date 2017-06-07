const db = require('./_db');
const Category = require('./models/category');
const Inventory = require('./models/inventory');
const Item = require('./models/item');
const Order = require('./models/order');
const Review = require('./models/review');
const User = require('./models/user');


// Item has one inventory
Item.belongsTo(Inventory);

// User has many orders
Order.belongsTo(User);
User.hasMany(Order);

// Category has many items
Item.belongsTo(Category);
Category.hasMany(Item);

// Items have many reviews
Review.belongsTo(Item);
Item.hasMany(Review);

// Users have many reviews
Review.belongsTo(User);
User.hasMany(Review);

// Users have many categories (preferences) ** join table: preferences **
Category.belongsToMany(User, { through: 'user_preferences' });
User.belongsToMany(Category, { through: 'user_preferences' });

// Order has many Items ** join table: order_items **
Order.belongsToMany(Item, { through: 'order_items' , onDelete:'CASCADE'});
Item.belongsToMany(Order, { through: 'order_items' });


module.exports = {
	db,
	Category,
	Inventory,
	Item,
	Order,
	Review,
	User
};

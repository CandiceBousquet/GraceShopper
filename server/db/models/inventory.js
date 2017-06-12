const Sequelize = require('sequelize');
const db = require('../_db');

const Inventory = db.define('inventory', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		validate: {
			min: 0
		}
	}
},{
	instanceMethods:{
		incrementQuantity: function(num){
			return this.update({
				quantity:this.quantity + num
			})
		},
		decrementQuantity: function(num){
			if(this.quantity - num < 0){
				throw new Error("Item is Sold Out");
			}else{
				return this.update({
					quantity:this.quantity - num
				})
			}

		}

	}
});

module.exports = Inventory;

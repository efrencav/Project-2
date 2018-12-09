"use strict";
module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define("Cart", {
		quantity: DataTypes.INTEGER
	}, {});
  
	Cart.associate = function(models) {
		Cart.belongsTo(models.User, {
			onDelete: "cascade"
		});
		Cart.belongsToMany(models.product, {
			through: "CartProduct",
			onDelete: "cascade"
		});
	};
	return Cart;
};
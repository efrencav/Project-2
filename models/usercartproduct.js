"use strict";
module.exports = (sequelize, DataTypes) => { 
	const UserCartProduct = sequelize.define("UserCartProduct", {
		quantity: DataTypes.INTEGER
	}, {});
	UserCartProduct.associate = function(models) { 
		//associations can be defined here
		UserCartProduct.belongsTo(models.User, {
			onDelete: "cascade"
		});
		UserCartProduct.belongsTo(models.product, {
			onDelete: "cascade"
		});
	};
	return UserCartProduct;
}; 
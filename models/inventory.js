"use strict";
module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define("Inventory", {
		quantity: DataTypes.INTEGER
	}, {});
	Inventory.associate = function(models) {
		// associations can be defined here
		Inventory.belongsTo(models.product, {
			onDelete: "cascade"
		});
	};
	return Inventory;
};
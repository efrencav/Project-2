"use strict";
module.exports = (sequelize) => {
	const ProductCategory = sequelize.define("ProductCategory", {
	}, {});
	ProductCategory.associate = function(models) {
		ProductCategory.belongsTo(models.product, {
			onDelete: "cascade"
		});
		ProductCategory.belongsTo(models.Categories, {
			onDelete: "cascade"
		});
	};
	return ProductCategory;
};
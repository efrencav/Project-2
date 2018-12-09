module.exports = function(sequelize, DataTypes) {
	const Product = sequelize.define("product", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		imageUrl:  {
			type: DataTypes.STRING,
			/* 			allowNull: false,
			validate: {
				len: [1]
			} */
		},
		description:{ 
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		price: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false,
			validate: {
				len: [1]
			}
		}
	});
    
	Product.associate = function(models) {
		// associations can be defined here
		Product.hasOne(models.Inventory, {
			onDelete: "cascade"
		});
		Product.belongsToMany(models.Cart, {
			through: "CartProduct",
			onDelete: "cascade"
		});
		Product.hasMany(models.ProductCategory, {
			onDelete: "cascade"
		});
	};
	/* 	Product.afterCreate((product, options) => {
		sequelize.models.Inventory.create().then(function(inventory) {
			product.setInventory(inventory);
		});
	}); */

	return Product;
};

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
			allowNull: false,
			validate: {
				len: [1]
			}
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

	return Product;
};

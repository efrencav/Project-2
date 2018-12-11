module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define("User", {
		// Giving the Author model a name of type STRING
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		username: {
			type: DataTypes.TEXT,
			notNull: true
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			notNull: true
		}
	});
	User.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		User.hasMany(models.UserRoles, {
			onDelete: "cascade"
		});
		User.hasMany(models.UserCartProduct, {
			onDelete: "cascade"
		});
	};
	/* 	User.afterCreate((user) => {
		sequelize.models.Cart.create().then(function(cart) {
			user.setCart(cart);
		});
	}); */

	return User;
};

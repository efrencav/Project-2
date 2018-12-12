module.exports = function(sequelize, DataTypes) {
	let Role = sequelize.define("Role", {
		// Giving the Author model a name of type STRING
		role: DataTypes.STRING
	});

	Role.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		Role.hasMany(models.UserRoles, {
			onDelete: "cascade"
		});
	};
	return Role;
};

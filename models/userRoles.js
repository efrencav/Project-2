module.exports = function(sequelize) {
    let userRoles = sequelize.define("UserRoles", {});

    userRoles.associate = function(models) {
        //   Associating Author with Posts
        //   When an Author is deleted, also delete any associated Posts
        console.log("user roles", models);
        userRoles.belongsTo(models.Role, {
            onDelete: "cascade"
        });
        userRoles.belongsTo(models.User, {
            onDelete: "cascade"
        });
    };

    return userRoles;
};

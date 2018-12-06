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
        console.log("users", models);
        User.hasMany(models.UserRoles, {
            onDelete: "cascade"
        });
    };

    return User;
};

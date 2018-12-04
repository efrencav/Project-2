module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Product.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Product.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Product;
};

module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("product", {
        title: DataTypes.STRING, 
        imageUrl:  DataTypes.STRING,
        description: DataTypes.STRING, 
        price: DataTypes.INTEGER
    });

    // Product.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Product.belongsTo(models.Author, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Product;
};

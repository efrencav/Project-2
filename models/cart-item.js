module.exports = function(sequelize, DataTypes) {
    const CartItem = sequelize.define("cartItem", {
        // Giving the CartItem model an id of type STRING
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER
    });

    // CartItem.associate = function(models) {
    //     CartItem.hasMany(models.Post, {
    //         onDelete: "cascade"
    //     });
    // };

    return CartItem;
};

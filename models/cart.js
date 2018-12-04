module.exports = function(sequelize, DataTypes) {
    const Cart = sequelize.define("cart", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });
    return Cart;
};

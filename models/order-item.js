module.exports = function(sequelize, DataTypes) {
    const OrderItem = sequelize.define("orderItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER
    });

    return OrderItem;
};

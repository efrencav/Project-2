module.exports = function(sequelize, DataTypes) {
	const Order = sequelize.define("order", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		}
	});

	return Order;
};

module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define("image", {
	  type: {
			type: Sequelize.STRING
	  },
	  name: {
			type: Sequelize.STRING
	  },
	  data: {
			type: Sequelize.BLOB("long")
	  }
	});
	
	return Image;
};




// module.exports = (sequelize, Sequelize) => {
// 	const Product = sequelize.define("product", {
// 		title: {
// 			type: Sequelize.STRING,
// 			allowNull: false,
// 			validate: {
// 				len: [1]
// 			}
// 		},
// 		imageUrl: {
// 			type: Sequelize.BLOB("long"),
// 			allowNull: false,
// 			validate: {
// 				len: [1]
// 			}
// 		},
// 		price: {
// 			type: Sequelize.DECIMAL(10,2),
// 			allowNull: false,
// 			validate: {
// 				len: [1]
// 			}
// 		},
// 		description: {
// 			type: Sequelize.DECIMAL(10,2),
// 			allowNull: false,
// 			validate: {
// 				len: [1]
// 			}
// 		},
// 	});
	
// 	return Product;
// };


"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        return queryInterface.bulkInsert(
            "products",
            [
                {
                    title: "The Black Boot",
                    imageUrl: "https://images.yswcdn.com/8938993984741695816-ql-85/652/1000/ay/langstons/justin-men-s-classic-western-cowboy-boots-black-114812.jpg",
                    description: "The basic boot you can't live without!  If you do... ya basic!",
                    price: 100.50,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "The Brown Boot",
                    imageUrl: "https://www.horsetown.com/images/D/10002204_3-4.jpg",
                    description: "Brown is the new black!",
                    price: 200.50,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "The White Boot",
                    imageUrl: "https://www.mensusa.com/images/Deer-Leather-White-Western-Boots-16725.jpg",
                    description: "Because you have the confidence to pull this off!",
                    price: 300.50,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
        return queryInterface.bulkDelete("products", null, {});
    }
};

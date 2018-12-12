"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert(
            "Inventories",
            [
                {
                    productId: 1,
                    quantity: 50,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    productId: 2,
                    quantity: 100,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    productId: 3,
                    quantity: 150,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete("Inventories", null, {});
    }
};

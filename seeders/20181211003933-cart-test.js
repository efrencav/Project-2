"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert(
            "UserCartProducts",
            [
                {
                    quantity: 5,
                    productId: 1,
                    UserId: 1,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    quantity: 4,
                    productId: 2,
                    UserId: 2,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    quantity: 3,
                    productId: 3,
                    UserId: 3,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete("UserCartProducts", null, {});
    }
};

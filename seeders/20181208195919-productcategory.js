"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert(
            "ProductCategories",
            [
                {
                    CategoryId: 1,
                    productId: 1,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    CategoryId: 2,
                    productId: 2,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    CategoryId: 3,
                    productId: 3,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                  CategoryId: 4,
                  productId: 3,
                  createdAt: Sequelize.literal("NOW()"),
                  updatedAt: Sequelize.literal("NOW()")
                },
                {
                  CategoryId: 4,
                  productId: 2,
                  createdAt: Sequelize.literal("NOW()"),
                  updatedAt: Sequelize.literal("NOW()")
                },
                {
                  CategoryId: 4,
                  productId: 1,
                  createdAt: Sequelize.literal("NOW()"),
                  updatedAt: Sequelize.literal("NOW()")
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete("ProductCategories", null, {});
    }
};

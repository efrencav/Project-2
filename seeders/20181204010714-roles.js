"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert(
            "Roles",
            [
                {
                    role: "customer",
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    role: "employee",
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    role: "administrator",
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete("Roles", null, {});
    }
};

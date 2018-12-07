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
            "UserRoles",
            [
                {
                    RoleId: 3,
                    UserId: 1,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    RoleId: 2,
                    UserId: 2,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    RoleId: 1,
                    UserId: 3,
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
        return queryInterface.bulkDelete("UserRoles", null, {});
    }
};

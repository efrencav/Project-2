"use strict";
const bCrypt = require("bcrypt-nodejs");

const generateHash = function(password) {
  return bCrypt.hashSync(
    password,
    bCrypt.genSaltSync(8),
    null
  );
};

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
            "Users",
            [
                {
                    username: "administrator",
                    email: "administrator@boots.com",
                    password: generateHash("Geaux1"),
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    username: "employee",
                    email: "employee@boots.com",
                    password: generateHash("Geaux1"),
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    username: "customer",
                    email: "customer@boots.com",
                    password: generateHash("Geaux1"),
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
        return queryInterface.bulkDelete("Users", null, {});
    }
};

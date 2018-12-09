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

        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    username: "administrator",
                    firstname: "administrator",
                    lastname: "administrator",
                    email: "administrator@boots.com",
                    password: generateHash("Geaux1"),
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    username: "employee",
                    firstname: "employee",
                    lastname: "employee",
                    email: "employee@boots.com",
                    password: generateHash("Geaux1"),
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    username: "customer",
                    firstname: "customer",
                    lastname: "customer",
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

        return queryInterface.bulkDelete("Users", null, {});
    }
};

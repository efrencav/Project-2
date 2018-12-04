-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS store_db;
-- Creates the "todolist" database --
CREATE DATABASE store_db;


CREATE TABLE boots (
    id NOT NULL AUTO_INCREMENT,
    title VARCHAR (255) NOT NULL,
    price: INT, NOT NULL,
    imageUrl: STRING, not null,
    description: STRING, NOT NULL,
    PRIMARY KEY (ID)
);


id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }

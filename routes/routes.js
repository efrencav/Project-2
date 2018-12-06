// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Products
  app.get("/api/product/", function(req, res) {
    db.Product.findAll({})
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // Get route for returning Products of a specific category
  app.get("/api/product/category/:category", function(req, res) {
    db.Product.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // Get route for retrieving a single Product
  app.get("/api/product/:id", function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // Product route for saving a new Product
  app.Product("/api/product", function(req, res) {
    console.log(req.body);
    db.Product.create({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      price: req.body.price,
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // DELETE route for deleting Products
  app.delete("/api/Products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });

  // PUT route for updating Products

  app.put("/api/Products", function(req, res) {
    db.Product.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  });
};

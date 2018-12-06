<<<<<<< HEAD
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
=======
module.exports = function(app, passport) {
    app.get("/", function(req, res) {
        res.render("home", { user: req.user });
    });

    app.get("/signup", function(req, res) {
        res.render("signup");
    });
    app.get("/signin", function(req, res) {
        res.render("signin");
    });
    app.get("/dashboard", isLoggedIn, function(req, res) {
        res.render("dashboard");
    });
    app.get("/logout", function(req, res) {
        req.session.destroy(function() {
            res.redirect("/");
        });
    });
    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/dashboard",
            failureRedirect: "/signup"
        })
    );
    app.post(
        "/signin",
        passport.authenticate("local-signin", {
            successRedirect: "/dashboard",
            failureRedirect: "/signin"
        })
    );
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/signin");
    }
>>>>>>> d496bcd53c990d99bcf8bdb4e2d082e2c1a77a78
};



// *********************************************************************************
// admin-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../admin/my-account.html"));
  });

  // cms route loads cms.html
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../admin/dashboard.html"));
  });

  // blog route loads blog.html
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../admin/forgot-password.html"));
  });

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

};










// // const path = require('path');

// // const express = require('express');

// // const adminController = require('../controllers/admin');

// // const router = express.Router();

// // // /admin/add-product => GET
// // router.get('/add-product', adminController.getAddProduct);

// // // /admin/products => GET
// // router.get('/products', adminController.getProducts);

// // // /admin/add-product => POST
// // router.post('/add-product', adminController.postAddProduct);

// // router.get('/edit-product/:productId', adminController.getEditProduct);

// // router.post('/edit-product', adminController.postEditProduct);

// // router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;

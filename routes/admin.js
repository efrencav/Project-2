var db = require("../models");

// Routes
// ===================================
module.exports = function(app) {
	// Dashboard sidemenu items
	
	app.get("/admin/account-information", function(req, res) {
		res.render("admin/account-information", {title: "Account Information"});
	});

	app.get("/admin/address-book", function(req, res) {
		res.render("admin/Address-book", {title: "Address Book"});
	});
module.exports = function(app, passport) {
	app.get("/admin", function(req, res) {
		// res.sendFile(path.join(__dirname, "../admin/my-account.html"));
		res.render("admin/dashboard");
	});
	
	app.get("/admin/my-orders", function(req, res) {
		res.render("admin/my-orders", {title: "Orders"});
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

// /admin/add-product => POST
// // router.post('/add-product', adminController.postAddProduct);

// // router.get('/edit-product/:productId', adminController.getEditProduct);

// // router.post('/edit-product', adminController.postEditProduct);

// // router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;

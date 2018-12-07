
// const path = require("path");

module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/admin", function(req, res) {
		// res.sendFile(path.join(__dirname, "../admin/my-account.html"));
		res.render("admin/dashboard");

	});

	// cms route loads cms.html
	// app.get("/admin/sigup", function(req, res) {
	// 	res.render("admin/signup");

	// });

	

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

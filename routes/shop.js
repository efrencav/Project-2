const path = require("path");
const db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/shop", function(req, res) {
		// res.sendFile(path.join(__dirname, "/"));
		res.render("index", {});
	});

	// blog route loads blog.html
	app.get("/shop", function(req, res) {
		res.render("add-product", {});
	});

};


// const path = require('path');

// const express = require('express');

// const shopController = require('../controllers/shop');

// const router = express.Router();

// router.get('/', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

// module.exports = router;

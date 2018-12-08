// const path = require("path");
// const db = require("../models");



// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	
	// index route to shop
	app.get("/shop", function(req, res) {
		// res.sendFile(path.join(__dirname, "/"));
		res.render("index", {});
	});

	// shop section, add product
	app.get("/shop/add-product", function(req, res) {
		res.render("shop/add-product", {title: "Add a new product"});
	});

	// route to cart
	app.get("/shop/cart", function(req, res) {
		res.render("shop/cart", {});
	});

	// route to product list
	app.get("/shop/product-list", function(req, res) {
		res.render("shop/product-list", {});
	});
	// route to product list
	app.get("/shop/mens/product-list", function(req, res) {
		res.render("shop/product-list", {});
	});

	// route to product list
	app.get("/shop/womens/product-list", function(req, res) {
		res.render("shop/product-list", {});
	});

	// route to product list
	app.get("/shop/kids/product-list", function(req, res) {
		res.render("shop/product-list", {});
	});

	// route to product
	app.get("/shop/product", function(req, res) {
		res.render("shop/product", {});
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

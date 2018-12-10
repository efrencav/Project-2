const express = require("express");
const multer = require("multer");
const path = require("path");

// const upload = multer({dest: "public/uploads/"});
const db = require("../models");
const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function(req, file, cb){
		cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits:{fileSize: 1000000},
	fileFilter: function(req, file, cb){
		checkFileType(file, cb);
	}
}).single("imageUrl");



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
		res.render("shop/product", {title: "Upload a new product"});
	});
	
	// POST route for saving a new post
	app.post("/shop/add-product", upload, function(req, res) {
		console.log(db.Products);
		db.product.create({
			title: req.body.title,
			imageUrl: req.body.imageUrl,
			description: req.body.description,
			price: req.body.price
		}).then(function(dbPost) {
			res.json(dbPost);
		});
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

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



module.exports = function(app,passport) {
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
	
	// POST route for saving a new post
	app.post("/shop/add-product", upload, function(req, res) {
		let qty = req.body.quantity;
		db.product.create({
			title: req.body.title,
			imageUrl: req.body.imageUrl,
			description: req.body.description,
			price: req.body.price
		}).then(function (response) {
			db.Inventory.create({productId: response.id})
				.then(function () {
					db.Inventory.update({quantity: qty},{where: {productId: response.id}})
						.then(function() {
							const checkBoxes = [req.body.Featured,req.body.Men,req.body.Women,req.body.Kids];
							checkBoxes.forEach(box => {
								if (box) {
									db.Categories.findOne({where: {category: box}}).then(function(cat) {
										db.ProductCategory.create({
											CategoryId: cat.id,
											productId: response.id
										});
									});
								}
							});
						});
				});
		});
	});
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect("/signin");
	}
	function isEmployee(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.redirect("/signin");
		}
		db.UserRoles.findOne({
			include: [
				{
					model: db.User,
					where: {id: req.user.id},
				},
				{
					model: db.Role,
					where: {$or: [{role: "employee"},{role: "administrator"}]}
				}
			]
		}).then(employee => {
			if (!employee) {
				res.redirect("/signin");
			}else {
				next();
			}
		});
	}
	function isAdministrator (req, res, next) {
		if (!req.isAuthenticated()) {
			return res.redirect("/signin");
		}
		db.UserRoles.findOne({
			include: [
				{
					model: db.User,
					where: {id: req.user.id},
				},
				{
					model: db.Role,
					where: {role: "administrator"}
				}
			]
		}).then(employee => {
			if (!employee) {
				res.redirect("/signin");
			}else {
				next();
			}
		});
	}	
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

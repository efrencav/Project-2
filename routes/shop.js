const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("../models");
const AWS = require("aws-sdk");
const Busboy = require("busboy");

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

function uploadToS3(file) {
	let s3bucket = new AWS.S3({
		accessKeyId: IAM_USER_KEY,
		secretAccessKey: IAM_USER_SECRET,
		Bucket: BUCKET_NAME
	});
	s3bucket.createBucket(function () {
		var params = {
			Bucket: BUCKET_NAME,
			Key: file.name,
			Body: file.data
		};
		s3bucket.upload(params, function (err, data) {
			if (err) {
				console.log("error in callback");
				console.log(err);
			}
			console.log("success");
			console.log(data);
		});
	});
}

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
	app.post("/shop/add-product", function (req, res, next) {
	// This grabs the additional parameters so in this case passing in
	// "element1" with a value.
		const element1 = req.body.element1;

		const busboy = new Busboy({ headers: req.headers });

		// The file upload has completed
		busboy.on("finish", function () {
			console.log("Upload finished");
		
			// Your files are stored in req.files. In this case,
			// you only have one and it's req.files.element2:
			// This returns:
			// {
			//    element2: {
			//      data: ...contents of the file...,
			//      name: 'Example.jpg',
			//      encoding: '7bit',
			//      mimetype: 'image/png',
			//      truncated: false,
			//      size: 959480
			//    }
			// }
		
			// Grabs your file object from the request.
			const file = req.files.element2;
			console.log(file);
		
			// Begins the upload to the AWS S3
			uploadToS3(file);
		});

		req.pipe(busboy);


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

};	

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

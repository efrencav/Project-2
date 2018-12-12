const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("../models");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const Promise = require("bluebird");

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

module.exports = function(app) {
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// shop section, add product
	app.get("/shop/add-product", function(req, res) {
		res.render("shop/add-product", {title: "Add a new product", user: req.user});
	});

	app.delete("/shop/cartitemremove/:id", function(req, res) {
		const id = req.params.id;
		db.User.findOne({where: {email: req.user.email}})
			.then(function(userInfo) {
				db.UserCartProduct.destroy({where: {$and: [{UserId: userInfo.id},{productId: id}]}});
				res.status(200).end();
			});
	});
	app.delete("/shop/clearcart/:id", function(req,res) {
		const id = req.params.id;
		db.User.findOne({where: {id: id}})
			.then(function(userInfo) {
				db.UserCartProduct.destroy({where: {UserId: userInfo.id}});
				res.status(200).end();
			});
	});
	// route to cart
	app.get("/shop/cart", isLoggedIn,function(req, res) {
		let cartList = [];
		let userInfo;
		db.User.findOne({where: {email: req.user.email}})
			.then(function (currentUser) {
				userInfo = currentUser;
				return db.UserCartProduct.findAll({where: {UserId: currentUser.id}})
					.then(function (cart) {
						return Promise.mapSeries(cart, (line=>{
							return db.product.findOne({where: {id: line.productId}}).then(function(productInfo) {
								line.price = productInfo.price;
								line.imageUrl = productInfo.imageUrl;
								line.description = productInfo.description;
								line.title = productInfo.title;
								cartList.push(line);
							});
							
						}));
					});
			})
			.then(()=>{
				res.render("shop/cart", {title: "Shopping Cart", user: userInfo, cartItem:cartList});

			});
		
	});

	// route to product list
	app.get("/shop/product-list", function(req, res) {
		db.product.findAll({}).then(function (data) {
			res.render("shop/product-list", {user: req.user, Product:data});
		});
		
	});
	// route to product list
	app.get("/shop/product-men", function(req, res) {
		const data = [];
		db.Categories.findOne({
			where: {category: "Men"}
		}).then(function (catName) {
			return db.ProductCategory.findAll({where: {CategoryId: catName.id}})
				.then(function (catData) {
					return Promise.mapSeries(catData, (part => {
						return db.product.findOne({where: {id:part.productId}}).then(function (info) {
							data.push(info);
						});
					}));
				})
				.then(()=>{
					res.render("shop/product-men", {title: "Men's Products", Product: data, user: req.user});
	
				});

		});
		
	});

	app.get("/shop/product-women", function(req, res) {
		const data = [];
		db.Categories.findOne({
			where: {category: "Women"}
		}).then(function (catName) {
			return db.ProductCategory.findAll({where: {CategoryId: catName.id}})
				.then(function (catData) {
					return Promise.mapSeries(catData, (part => {
						return db.product.findOne({where: {id:part.productId}}).then(function (info) {
							data.push(info);
						});
					}));
				})
				.then(()=>{
					res.render("shop/product-women", {title: "Women's Products", Product: data, user: req.user});
	
				});

		});
		
	});
	app.get("/shop/product-kids", function(req, res) {
		const data = [];
		db.Categories.findOne({
			where: {category: "Kids"}
		}).then(function (catName) {
			return db.ProductCategory.findAll({where: {CategoryId: catName.id}})
				.then(function (catData) {
					return Promise.mapSeries(catData, (part => {
						return db.product.findOne({where: {id:part.productId}}).then(function (info) {
							data.push(info);
						});
					}));
				})
				.then(()=>{
					res.render("shop/product-kids", {title: "Kid's Products", Product: data, user: req.user});
	
				});

		});
		
	});

	// route to product list
	app.get("/shop/product-featured", function(req, res) {
		const data = [];
		db.Categories.findOne({
			where: {category: "Featured"}
		}).then(function (catName) {
			return db.ProductCategory.findAll({where: {CategoryId: catName.id}})
				.then(function (catData) {
					return Promise.mapSeries(catData, (part => {
						return db.product.findOne({where: {id:part.productId}}).then(function (info) {
							data.push(info);
						});
					}));
				})
				.then(()=>{
					res.render("partials/featured-products-partial", {title: "Featured Products", Product: data, user: req.user});
	
				});

		});
		
	});
	
	app.post("/shop/cart/product/:id", isLoggedIn, function(req,res) {
		const id = req.params.id;
		db.User.findOne({where: {email:req. user.email}})
			.then(function (userInfo) {
				db.product.findOne({where: {id: id}})
					.then(function (productId) {
						db.UserCartProduct.create({
							UserId: userInfo.id,
							productId: productId.id,
							quantity: 1
						});
					});
			});
	});
	

	// POST route for saving a new post
	app.post("/shop/add-product", isEmployee, function (req, res, next) {
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


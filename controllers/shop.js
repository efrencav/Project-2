const db = require("../models");
module.exports = function(app) {
// Create all our routes and set up logic within those routes where required.
	app.get("/api/products", function (req, res) {
		db.product.findAll({}).then(function (data) {
			const hbsObject = {
				Product: data
			};
			res.render("products", hbsObject);
		});
	});

	app.post("/api/product", function (req, res) {
		db.Product.create([
			"title",
			"imageUrl",
			"description",
			"price"
		], [
			req.body.title, req.body.imageUrl, req.body.description, req.body.price,
		], function (result) {
			// Send back the ID of the new quote
			res.json({
				id: result.insertId
			});
		});
	});

	app.put("/api/product/:id", function (req, res) {
		console.log(req.body);
		var condition = "id = " + req.params.id;
		db.Product.update({
			// title:,
			// imageUrl:,
			// description:,
			// price:
			// },
			condition,
			function (result) {
				if (result.changedRows === 0) {
					// If no rows were changed, then the ID must not exist, so 404
					return res.status(404).end();
				}
				res.status(200).end();
			}
		});
	});

	app.put("/api/add-product", function (req, res) {

		db.Product.create([
			"title",
			"imageUrl",
			"description",
			"price"
		], [
			req.body.title, req.body.imageUrl, req.body.description, req.body.price,
		], function (result) {
			// Send back the ID of the new quote
			res.json({
				id: result.insertId
			});
		});
	});

};
// Export routes for server.js to use.
      

// const Product = require("../models/product");

// exports.getProducts = (req, res, next) => {
//     Product.findAll()
//         .then((products) => {
//             res.render("shop/product-list", {
//                 prods: products,
//                 pageTitle: "All Products",
//                 path: "/products"
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     // Product.findAll({ where: { id: prodId } })
//     //   .then(products => {
//     //     res.render('shop/product-detail', {
//     //       product: products[0],
//     //       pageTitle: products[0].title,
//     //       path: '/products'
//     //     });
//     //   })
//     //   .catch(err => console.log(err));
//     Product.findById(prodId)
//         .then((product) => {
//             res.render("shop/product-detail", {
//                 product: product,
//                 pageTitle: product.title,
//                 path: "/products"
//             });
//         })
//         .catch((err) => console.log(err));
// };

// exports.getIndex = (req, res, next) => {
//     Product.findAll()
//         .then((products) => {
//             res.render("shop/index", {
//                 prods: products,
//                 pageTitle: "Shop",
//                 path: "/"
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.getCart = (req, res, next) => {
//     req.user
//         .getCart()
//         .then((cart) => {
//             return cart
//                 .getProducts()
//                 .then((products) => {
//                     res.render("shop/cart", {
//                         path: "/cart",
//                         pageTitle: "Your Cart",
//                         products: products
//                     });
//                 })
//                 .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     let fetchedCart;
//     let newQuantity = 1;
//     req.user
//         .getCart()
//         .then((cart) => {
//             fetchedCart = cart;
//             return cart.getProducts({ where: { id: prodId } });
//         })
//         .then((products) => {
//             let product;
//             if (products.length > 0) {
//                 product = products[0];
//             }

//             if (product) {
//                 const oldQuantity = product.cartItem.quantity;
//                 newQuantity = oldQuantity + 1;
//                 return product;
//             }
//             return Product.findById(prodId);
//         })
//         .then((product) => {
//             return fetchedCart.addProduct(product, {
//                 through: { quantity: newQuantity }
//             });
//         })
//         .then(() => {
//             res.redirect("/cart");
//         })
//         .catch((err) => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user
//         .getCart()
//         .then((cart) => {
//             return cart.getProducts({ where: { id: prodId } });
//         })
//         .then((products) => {
//             const product = products[0];
//             return product.cartItem.destroy();
//         })
//         .then((result) => {
//             res.redirect("/cart");
//         })
//         .catch((err) => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user
//         .getCart()
//         .then((cart) => {
//             fetchedCart = cart;
//             return cart.getProducts();
//         })
//         .then((products) => {
//             return req.user
//                 .createOrder()
//                 .then((order) => {
//                     return order.addProducts(
//                         products.map((product) => {
//                             product.orderItem = {
//                                 quantity: product.cartItem.quantity
//                             };
//                             return product;
//                         })
//                     );
//                 })
//                 .catch((err) => console.log(err));
//         })
//         .then((result) => {
//             return fetchedCart.setProducts(null);
//         })
//         .then((result) => {
//             res.redirect("/orders");
//         })
//         .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//     req.user
//         .getOrders({include: ["products"] })
//         .then((orders) => {
//             res.render("shop/orders", {
//                 path: "/orders",
//                 pageTitle: "Your Orders",
//                 orders: orders
//             });
//         })
//         .catch((err) => console.log(err));
// };
// const express = require("express");
// const db = require("../models");
// const app = express.Router();
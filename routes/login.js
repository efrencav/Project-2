const db = require("../models");
module.exports = function(app, passport) {
	app.get("/", function(req, res) {
		res.render("index", {title: "Boots and Stuff", user: req.user});
	});

	app.get("/contact", function(req, res) {
		res.render("contact", {title: "Contact Us!", user: req.user});
	});

	app.get("/about", function(req, res) {
		res.render("about", {title: "About Boots and Stuff", user: req.user});
	});

	app.get("/signup", function(req, res) {
		res.render("admin/signup", {title: "Create Account", user: req.user});
	});
	app.get("/signin", function(req, res) {
		res.render("admin/signin", {title: "Sign In", user: req.user});
	});
	app.get("/dashboard", isLoggedIn, function(req, res) {
		res.render("admin/dashboard", {title: "Your Account Info", user: req.user});
	});
	app.get("/employee", isEmployee, function(req, res) {
		res.render("employee/employee", {title: "Employee Page", user: req.user});
	});
	app.get("/administrator", isAdministrator, function(req, res) {
		res.render("employee/administrator", {title: "Administrator Page", user: req.user});
	});
	app.get("/logout", function(req, res) {
		req.session.destroy(function() {
			res.redirect("/");
		});
	});
	
	app.post(
		"/signup",
		passport.authenticate("local-signup", {
			successRedirect: "/dashboard",
			failureRedirect: "/signup"
		})
	);
	app.post(
		"/signin",
		passport.authenticate("local-signin", {
			successRedirect: "/dashboard",
			failureRedirect: "/signin"
		})
	);
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

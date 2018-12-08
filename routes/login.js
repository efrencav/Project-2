module.exports = function(app, passport) {
	app.get("/", function(req, res) {

		res.render("index", {title: "Boots and Stuff"});
	});

	app.get("/contact", function(req, res) {
		res.render("contact", {title: "Contact Us!"});
	});

	app.get("/about", function(req, res) {
		res.render("about", {title: "About Boots and Stuff"});
	});

	app.get("/signup", function(req, res) {
		res.render("admin/signup", {title: "Create Account"});
	});
	app.get("/signin", function(req, res) {
		res.render("admin/signin", {title: "Sign In"});
	});
	app.get("/dashboard", isLoggedIn, function(req, res) {
		res.render("admin/dashboard", {title: "Your Account Info"});
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
};

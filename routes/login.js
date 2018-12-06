module.exports = function(app, passport) {
	app.get("/", function(req, res) {

		res.render("index");
	});

	app.get("/", function(req, res) {

		res.render("contact");
	});

	app.get("/", function(req, res) {

		res.render("about");
	});

	app.get("/admin", function(req, res) {
		res.render("signup");
	});
	app.get("/admin", function(req, res) {
		res.render("signin");
	});
	app.get("/admin", isLoggedIn, function(req, res) {
		res.render("dashboard");
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

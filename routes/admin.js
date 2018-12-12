var db = require("../models");

// Routes
// ===================================
module.exports = function (app) {
	// Dashboard sidemenu items

	app.get("/admin/account-information", function (req, res) {
		res.render("admin/account-information", {
			title: "Account Information"
		});
	});

	app.get("/admin/address-book", function (req, res) {
		res.render("admin/Address-book", {
			title: "Address Book"
		});
	});
	app.get("/admin", function (req, res) {
		// res.sendFile(path.join(__dirname, "../admin/my-account.html"));
		res.render("admin/dashboard");
	});

	app.get("/admin/my-orders", function (req, res) {
		res.render("admin/my-orders", {
			title: "Orders"
		});
	});

};

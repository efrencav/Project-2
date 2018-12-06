// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
dotenv = require("dotenv").config();
const express = require("express");
const multer = require("multer");
require("handlebars");
// const path = require('path');



// =============================================================
// Requiring our models for syncing
const db = require("./models");
const path = require("path");
const session = require("express-session");
//Passport for Login
const passport = require("passport");


// Set The Storage Engine
const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	}
});

// Init Upload
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Images Only!");
	}
}

// =============================================================


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));



// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs({
	defaultLayout: "main",
	extname: ".hbs"
}));
app.set("view engine", "hbs");
//Initialize Passport
app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true
	})
); // session secret
app.use(passport.initialize());
app.use(passport.session());
// Import routes and give the server access to them.
const router = express.Router();
//const storeController = require("./controllers/store_controller.js");
const auth = require("./routes/login.js")(app, passport);
app.use(router);

require("./passport/passport.js")(passport, db.User);

// Routes
// =============================================================
require("./routes/admin.js")(app);
require("./routes/shop.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================


app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.render("index", {
				msg: err
			});
		} else {
			if (req.file == undefined) {
				res.render("index", {
					msg: "Error: No File Selected!"
				});
			} else {
				res.render("index", {
					msg: "File Uploaded!",
					file: `uploads/${req.file.filename}`
				});
			}
		}
	});
});

// =============================================================


db.sequelize.sync({}).then(function () {

	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
	});
});

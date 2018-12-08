// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const Busboy = require("busboy");

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
// const upload = multer({
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: "boots-n-stuff",
// 		acl: "public-read",
// 		key: function (req, file, cb) {
// 			cb(null, Date.now().toString());
// 		}
// 	})
// });

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

// AWS S3 Bucket Details
// =============================================================

// const opts = {
// 	s3: s3,
// 	bucket: config.originalsBucket,
// 	metadata: function (req, file, cb) {
// 		cb(null, Object.assign({}, req.body));
// 	},
// 	key: function (req, file, cb) {
// 		cb(null, req.params.id + ".jpg", "jpeg", "png");
// 	}
// };

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
const shop = require("./controllers/shop.js")(app);

app.use(router);

require("./passport/passport.js")(passport, db.User);

// Routes
// =============================================================
require("./routes/admin.js")(app);
require("./routes/shop.js")(app);
require("./controllers/shop.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================


app.post("/uploads/", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.render("404", {
				msg: err
			});
		} else {
			if (req.file == undefined) {
				res.render("404", {
					msg: "Error: No File Selected!"
				});
			} else {
				res.render("/shop/add-product", {
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

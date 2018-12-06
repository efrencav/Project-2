// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
dotenv = require("dotenv").config();
const express = require("express");
// Requiring our models for syncing
const db = require("./models");
const path = require("path");
const session = require("express-session");
//Passport for Login
const passport = require("passport");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//Initialize Passport
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
// Import routes and give the server access to them.
const router = express.Router();
//const storeController = require("./controllers/store_controller.js");
require("./routes/routes.js")(app, passport);
app.use(router);

require("./passport/passport.js")(passport, db.User);

// Routes
// =============================================================
// require("./routes/admin.js")(app);
// require("./routes/shop.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

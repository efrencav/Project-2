const bCrypt = require("bcrypt-nodejs");
const db = require("../models");

module.exports = function(passport, user) {
    let User = db.User;
    User = user;
    const LocalStrategy = require("passport-local").Strategy;

    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true
            },
            function(req, email, password, done) {
                const generateHash = function(password) {
                    return bCrypt.hashSync(
                        password,
                        bCrypt.genSaltSync(8),
                        null
                    );
                };

                User.findOne({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                    if (user) {
                        return done(null, false, {
                            message: "That e-mail address is already taken"
                        });
                    } else {
                        const userPassword = generateHash(password);
                        const data = {
                            email: email,
                            password: userPassword,
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };
                        User.create(data).then(function(newUser) {
                            if (!newUser) {
                                return done(null, false);
                            }
                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            }
        )
    );
    //LOCAL SIGNIN
    passport.use(
        "local-signin",
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                let User = user;
                let isValidPassword = function(userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                };
                User.findOne({
                    where: {
                        email: email
                    }
                })
                    .then(function(user) {
                        if (!user) {
                            return done(null, false, {
                                message: "Email does not exist"
                            });
                        }
                        if (!isValidPassword(user.password, password)) {
                            return done(null, false, {
                                message: "Incorrect password."
                            });
                        }
                        let userinfo = user.get();
                        return done(null, userinfo);
                    })
                    .catch(function(err) {
                        console.log("Error:", err);

                        return done(null, false, {
                            message: "Something went wrong with your Signin"
                        });
                    });
            }
        )
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};

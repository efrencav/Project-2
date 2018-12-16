# Project-2 Boots-n-Stuff Online Marketplace

## Online store for Cowboy Boots

This is an in-depth look at creating an online marketplace.  Since we live in Texas, we used cowboy boots as a product around which to create this marketplace.  The site features an employee area and a customer area.  Authentication is employed via Passport.js and admittance to the employee areas is only allowed for those users with the role of employee or administrator.  Employees can add more products to the database.  Everyone, once creating an account and signing in, can view their profile dashboard and select products for purchase and add to their cart.  

The site uses a SQL database, utilizes Sequelize as an ORM, features authentication with Passport.js, and utilizes the Blurbird npm package for promise chaining.  The database features multiple associated tables and pre-created seeds.  

Future developments for this project include improving picture upload on employee item entry, adding e-mail address authentication with reply required, and purchasing capabilities with credit card.

[Boots-n-Stuff Online Marketplace](https://boots-n-stuff.herokuapp.com/ "Boots-n-Stuff Online Marketplace")

### Middleware

- User Authentication with Passport
- Shopping Cart

### Technologies

- Node JS
- Express
- Express-handlebars
- Sequelize
- MySQL
- Heroku
- Passport.js
- Bluebird
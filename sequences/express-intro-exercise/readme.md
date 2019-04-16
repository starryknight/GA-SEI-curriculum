# express-intro-exercise

# Objective

* Create an API that defines the behavior of a single concept
* Create an HTTP server that uses an API to provide behavior to a web client


# Setup

```
cd coffee-shop
npm install express
```

__DO NOT COMMIT `node_modules`__



# Testing your code

_After_ writing both your api and web server 

1. run `node ./coffeeShopServer.js`
1. In another terminal (make sure you're in the coffee-shop directory) run
   `make` (if you don't have make then run `./test` instead)

Make sure you restart your server after updating your code!

# Create API

Write an API in `coffeeShop.js` that defines a set of functions that provide
CRUD behavior for a list of coffee shops.

Each coffee shop should have the following schema: 

* name (string)
* adress (string)
* menuItems ([string])
* openingTime (Number)
* closingTime (Number)

Your API should provide a set of functions that: 

parameters | return
--- | ---
list of coffee shops, index | a single coffee shop
list of coffee shops, index, coffee shop | list of shops with element at index replaced with given coffee shop
list of coffee shops, index | list of coffee shops with element at index removed
list of coffee shops, coffee shop | list of coffee shops

# Create Web Server

Write an HTTP server in `coffeeShopServer.js` using express that uses the API
you wrote. This HTTP server should have the following routes that provide the
matching CRUD behavior.

route | HTTP Verb | Response
--- | --- | ---
`/shops/new` | GET | a new coffee shop
`/shops` | GET | list of all coffee shops
`/shops/n` | GET | a single coffee shop at index `n`
`/shops` | POST | index of a new shop added to list of shops (new shop in request should be body of a request; use `req.body`)
`/shops/n` | PUT | replaces a shop (at index `n`) with the shop from the request body. Responds with index of replaced element.
`/shops/n` | DELETE | length of list of shops after element at `n` is removed

Use the `coffeeShops` global variable to store your coffeeShops.

# Strech Goals

1. Add some more methods to your API that modify the data inside of the coffee
   shop (such as adding a menu item or changin the name)
1. Write an HTTP request handler to provide an interface to that new API method
   you just wrote.

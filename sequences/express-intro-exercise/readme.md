# express-intro-exercise

# Objective

* Create an API that defines the behavior of a single concept
* Create an HTTP server that uses an API to provide behavior to a web client

# Create API

Write an API that defines a set of functions that provide CRUD behavior for a
coffee shop model.

The coffee shop should have the following schema: 

* name (string)
* adress (string)
* menuItems ([string])
* openingTime (Number)
* closingTime (Number)

Your API should provide a set of functions that: 

input | output
--- | ---
list of coffeeShops | all coffee shops
list of coffeeShops, index | a single coffee shop
list of coffeeShops, index, coffee shop | list of shops with element at index replaced with given coffee shop
list of coffeeShops, index | list of coffee shops with element at index removed
lsit of coffeeShops, coffee shop | list of coffee shops

# Create Web Server

Write an HTTP server using express that uses the API you wrote. This HTTP
server should have the following routes that provide the matching CRUD
behavior.

route | HTTP Verb | Response
--- | --- | ---
`/shops` | GET | list of all coffee shops
`/shops/n` | GET | a single coffee shop at index `n`
`/shops` | POST | index of a new shop added to list of shops (new shop in request should be body of a request; use `req.body`)
`/shops/n` | PUT | replaces a shop (at index `n`) with the shop from the request body. Responds with index of replaced element.
`/shops/n` | DELETE | length of list of shops after element at `n` is removed

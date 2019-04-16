# express-intro-exercise

# Objective

* Create an API that defines the behavior of a single concept
* Create an HTTP server that uses an API to provide behavior to a web client

# Setup

run `npm init` to install node package dependencies

__DO NOT COMMIT `node_modules`__

# Testing your code

_After_ writing both your api and web server run `make` to test your web server

# Create API

Write an API that defines a set of functions that provide CRUD behavior for a
list of coffee shops.

Each coffee shop should have the following schema: 

* name (string)
* adress (string)
* menuItems ([string])
* openingTime (Number)
* closingTime (Number)

Your API should provide a set of functions that: 

input | output
--- | ---
list of coffee shops | all coffee shops
list of coffee shops, index | a single coffee shop
list of coffee shops, index, coffee shop | list of shops with element at index replaced with given coffee shop
list of coffee shops, index | list of coffee shops with element at index removed
lsit of coffee shops, coffee shop | list of coffee shops

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


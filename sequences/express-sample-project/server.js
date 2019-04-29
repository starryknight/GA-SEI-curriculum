const express = require('express')
const app = express()
const bankApi = require('./api/bankApi.js')

// Register middleware
app.use(express.json())

//add middleware for handlebars here

//global variable to store list of accounts
let accounts = [];

//Write your HTTP request handlers using RESTful routes here
//call methods in the bankApi as needed. Feel free to modify the API
//as you see fit to accomplish the goals of the app

//accounts GET (all)

//accounts GET (single)

//accounts POST

//accounts PUT (single)

//accounts DELTE

//keep these lines at the bottom of the file
const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

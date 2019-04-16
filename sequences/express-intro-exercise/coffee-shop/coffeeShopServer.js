const express = require('express')
const app = express()

//makes express able to handle JSON data
app.use(express.json());

app.get('/',function(req,res){
    res.send("welcome to the coffee shop")
})

const port = process.env.PORT || 3000
app.listen(port,function(){
    console.log("you are now connected on port 3000")
})

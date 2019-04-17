const CoffeeShops = require('./coffeeShop.js')
const express = require('express')
const app = express()

//makes express able to handle JSON data
app.use(express.json());

let coffeeShops = [];

app.get('/',function(req,res){
    res.send("welcome to the coffee shop")
})

app.get('/shops',function(req,res){
    res.send(coffeeShops);
})

app.get('/shops/new', function(req, res) {
  res.send(CoffeeShops.constructNewShop());
})

app.get('/shops/:i',function(req,res){
    res.send(CoffeeShops.getCoffeeShopAt(coffeeShops, req.params.i));
})

app.post('/shops',function(req,res){
    res.send(`${CoffeeShops.addShop(coffeeShops, req.body)}`);
})

app.put('/shops/:i',function(req,res){
    coffeeShops = CoffeeShops.updateShopAt(coffeeShops, req.params.i, req.body);
    res.send(req.params.i)
})

app.delete('/shops/:i',function(req,res){
    coffeeShops = CoffeeShops.deleteShopAt(coffeeShops, req.params.i)
    res.send(`${coffeeShops.length}`)
})

const port = process.env.PORT || 3000
app.listen(port,function(){
    console.log("you are now connected on port 3000")
})

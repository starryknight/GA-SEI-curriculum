const express = require('express')
const app = express()
const bankApi = require('./api/bankApi.js')

// Register middleware
app.use(express.json())

let accounts = [];

app.get('/accounts', (req, res) => {
  res.send(bankApi.getAccounts(accounts))
})

app.get('/accounts/:accountId', (req, res) => {
  res.send(bankApi.getAccountAtId(accounts, req.params.accountId));
})

app.post('/accounts', (req, res) => {
  res.send(bankApi.addNewAccount(accounts, req.body))
})

app.put('/accounts/:accountId', (req, res) => {
  res.send(bankApi.replaceAccountAt(accounts, req.params.accountId, req.body));
})

app.delete('/accounts/:accountId', (req, res) => {
  res.send(bankApi.deleteAccountAt(accounts, req.params.accountId));
})


const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

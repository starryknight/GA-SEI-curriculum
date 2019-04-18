const express = require('express')
const router = express.Router()
const User = require('../mongo/User.js/index.js')
const Account = require('../mongo/Account.js/index.js')

// Handle users

// Users Index
router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users)
    })
})


router.post('/users', (req, res) => {
    User.create(req.body).then((user) => {
        res.send(user)
    })
})

router.get('/users/:userId', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        res.send(user)
    })
})

router.put('/users/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true}).then((updatedUser) => {
        res.send(updatedUser)
    })
})

router.delete('/users/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId).then((user) => {
        res.send(user)
    })
})

// Handle accounts

// Accounts Index
router.get('/users/:userId/accounts', (req, res) => {
    const userId = req.params.userId

    User.findById(userId).populate('accounts').then((user) => {
        res.render('accounts/index', {user: user})
    })
})

// Accounts Create
router.post('/users/:userId/accounts', (req, res) => {
    const userId = req.params.userId

    User.findById(userId).then((selectedUser) => {
        Account.create(req.body)
            .then((newAccount) => {
                selectedUser.accounts.push(newAccount)
                selectedUser.save()
                res.send(selectedUser)
            })
            .catch(err => {
                res.send(err.message)
            })
    })
})

// Accounts Edit
router.get('/users/:userId/accounts/:accountId/edit', (req, res) => {
    Account.getById(req.params.accountId).then((selectedAccount) => {
        res.render('accounts/edit', {account: selectedAccount})
    })
})

// Accounts Update
router.put('/users/:userId/accounts/:accountId', (req, res) => {
    const accountId = req.params.accountId
    
    Account.findByIdAndUpdate(accountId, req.body, {new: true}).then(updatedAccount => {
        res.send(updatedAccount)
    })
})

// Accounts Show
router.get('/users/:userId/accounts/:accountId', (req, res) => {
    Account.findById(req.params.accountId).then((selectedAccount) => {
        res.render('accounts/show', {account: selectedAccount})
    })
})

// Accounts Delete
router.delete('/users/:userId/accounts/:accountId', (req, res) => {
    Account.findByIdAndDelete(req.params.accountId).then(deletedAccount => {
        res.send(deletedAccount)
    })
})

// Withdraw
router.put('/users/:userId/accounts/:accountId')

module.exports = router
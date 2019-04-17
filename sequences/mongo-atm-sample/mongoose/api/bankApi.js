const mongoose = require('../mongo/connection.js.js')
const Schema = mongoose.Schema

const accountSchema = new Schema({
    accountName: String,
    isActive: {
        type: Boolean,
        default: true
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    accountType: {
        type: String,
        enum: ['Checking', 'Savings']
    },
    authorId: mongoose.Types.ObjectId,
    overdraftId: mongoose.Types.ObjectId
})

const userSchema = new Schema({
    name: String,
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('User', userSchema)

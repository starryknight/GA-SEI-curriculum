const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Creature = new Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('Creature', Creature)
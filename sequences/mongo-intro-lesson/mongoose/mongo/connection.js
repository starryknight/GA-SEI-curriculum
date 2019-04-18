const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bank', { useNewUrlParser: true }).then(() => {
    console.log('MONGODB is now connected')
})

module.exports = mongoose
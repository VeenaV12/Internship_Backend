const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name:String,
    email:String
})

const Data = mongoose.model('passList', testSchema);

module.exports = Data
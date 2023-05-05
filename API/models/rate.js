const mongoose = require('mongoose');

module.exports = mongoose.model('RateUs', new mongoose.Schema({
    name: String,
    rating: Number,
    review:String
}, { collection: 'RateUs' }));

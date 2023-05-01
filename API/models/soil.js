const mongoose = require('mongoose');

module.exports = mongoose.model('soil', new mongoose.Schema({
    device: {
        type:String,
        unique:true
    },
    sensorData: Array
}, { collection: 'soil' }));
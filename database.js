const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
    },
    password: {
        type: String
    }
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
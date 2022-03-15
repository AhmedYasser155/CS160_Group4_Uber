const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String
})


const User = mongoose.model('user', userSchema);

module.exports = {
    User
}
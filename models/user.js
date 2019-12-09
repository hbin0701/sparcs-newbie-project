const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    password: String,
    name: String,
    birthday: String,
    email: String,
    address: String
});

module.exports = mongoose.model('user', userSchema);
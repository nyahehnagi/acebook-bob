const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  username: String,
  name: String,
  posts: Array
})

const User = mongoose.model('User', UserSchema)

UserSchema.plugin(uniqueValidator, {message: "This e-mail is already signed up"});
module.exports = User

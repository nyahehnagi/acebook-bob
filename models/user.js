const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: Array,
  profilePicLocation: String,
})

const User = mongoose.model('User', UserSchema)

module.exports = User

// Requires
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  role: {
    default: 'user',
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  password: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageSrc: {
    default: '../images/icons/user.png',
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  steps: {
    required: false,
    type: Array,
    unique: false,
    trim: true
  }
})

/**
 * Hashes the passwod before saving.
 */
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

const User = mongoose.model('User', userSchema)

// Exports
module.exports = User

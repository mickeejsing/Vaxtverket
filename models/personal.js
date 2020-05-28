// Requires
const mongoose = require('mongoose')

const personalSchema = mongoose.Schema({
  userID: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  plantID: {
    required: true,
    type: Array,
    unique: false,
    trim: true
  },
  alerts: {
    required: true,
    type: Array,
    unique: false,
    trim: true
  },
  states: {
    required: true,
    type: Array,
    unique: false,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Personal = mongoose.model('Personal', personalSchema)

// Exports
module.exports = Personal

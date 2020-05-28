// Requires
const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  userID: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  plantID: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  message: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  seen: {
    required: false,
    type: Boolean,
    unique: false,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Notification = mongoose.model('Notification', notificationSchema)

// Exports
module.exports = Notification

// Requires
const mongoose = require('mongoose')

const plantSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  latin: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  general: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  seasons: {
    required: true,
    type: Array,
    unique: false,
    trim: true
  },
  setFrom: {
    required: true,
    type: Number,
    unique: false,
    trim: true
  },
  setTo: {
    required: true,
    type: Number,
    unique: false,
    trim: true
  },
  steps: {
    required: true,
    type: Array,
    unique: false,
    trim: true
  },
  alert: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  stepsDone: {
    required: false,
    type: Array,
    unique: false
  },
  water: {
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

const Plant = mongoose.model('Plant', plantSchema)

// Exports
module.exports = Plant

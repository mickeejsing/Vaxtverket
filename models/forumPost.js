// Requires
const mongoose = require('mongoose')
const socket = require('../app.js')

const forumPostSchema = mongoose.Schema({
  author: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  authorID: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  categoryID: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  title: {
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
  date: {
    type: Date,
    default: Date.now
  }
})

const ForumPost = mongoose.model('ForumPost', forumPostSchema)

ForumPost.watch().on('change', async function (data) {
  if (data.fullDocument) {
    socket.io.emit('post', data.fullDocument)
  }
})

// Exports
module.exports = ForumPost

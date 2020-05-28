// Requires
const mongoose = require('mongoose')
const socket = require('../app.js')

const commentSchema = mongoose.Schema({
  commentID: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
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
  comment: {
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

const Comment = mongoose.model('Comment', commentSchema)

Comment.watch().on('change', async function (data) {
  if (data.fullDocument) {
    socket.io.emit('comment', data.fullDocument)
  }
})

// Exports
module.exports = Comment

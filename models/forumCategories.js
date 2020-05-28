// Requires
const mongoose = require('mongoose')

const forumCategoriesSchema = mongoose.Schema({
  category: {
    required: true,
    type: String,
    unique: false,
    trim: true
  },
  description: {
    required: true,
    type: String,
    unique: false,
    trim: true
  }
})

const forumCategories = mongoose.model('forumCategories', forumCategoriesSchema)

// Exports
module.exports = forumCategories

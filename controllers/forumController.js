'use strict'

const ForumCategories = require('../models/forumCategories')
const ForumPost = require('../models/forumPost')
const Comment = require('../models/comment')
const forumController = {}

forumController.index = async (req, res) => {
  try {
    const categories = {
      categories: (await ForumCategories.find({}))
        .map(category => ({
          category: category.category,
          id: category._id
        }))
    }
    res.render('pages/forum', { categories })
  } catch (error) {
    console.error(error)
  }
}

forumController.category = async (req, res) => {
  try {
    if (req.query.id) {
      const obj = await (await ForumCategories.findOne({ _id: req.query.id })).toObject()

      const posts = {
        categories: (await ForumPost.find({ categoryID: req.query.id }))
          .map(post => ({
            id: post._id,
            title: post.title,
            author: post.author,
            message: post.message,
            date: post.date.toString().substr(0, 15)
          })).sort((a, b) => {
            if (a.date < b.date) {
              return -1
            } if (a.name > b.name) {
              return 1
            }
          })
      }

      for (const element of posts.categories) {
        const comments = await Comment.find({ commentID: element.id })

        if (comments.length > 0) {
          element.comments = comments.map(comment => ({
            author: comment.author,
            comment: comment.comment,
            date: comment.date.toString().substr(0, 15)
          }))
        }
      }

      const data = {}
      data.category = obj
      data.posts = posts

      res.render('pages/category', { data })
    } else {
      res.status(404)
      res.send('Not found')
    }
  } catch (error) {
    console.error(error)
  }
}

forumController.categoryPost = async (req, res, next) => {
  const title = req.body.title
  const message = req.body.message
  const comment = req.body.comment
  const id = req.body.commentID

  try {
    if (title) {
      const post = new ForumPost({
        author: req.session.data.username,
        authorID: req.session.data.id,
        categoryID: req.query.id,
        title: title,
        message: message
      })
      await post.save()
    }

    if (comment) {
      const com = new Comment({
        commentID: id,
        author: req.session.data.username,
        authorID: req.session.data.id,
        comment: comment
      })

      await com.save()
    }
  } catch (error) {
    console.error(error)
    res.redirect('back')
  }

  res.redirect('back')
}

// Exports
module.exports = forumController

/*
   const forumPost = new ForumPost({
        author: 'mickeejsing',
        authorID: '5ec123453f3e96b2c964b06f',
        categoryID: req.query.id,
        message: 'Jag undrar hur man får en ost att gro på måndagar. Jag har läst på internet men jag har inte hittat någonting. Jag är väldigt tacksam för svar. Tack ska ni ha.',
        title: 'Det här är ett testinlägg'
      })

      await forumPost.save()
*/

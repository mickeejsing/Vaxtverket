// const auth = require('../middleware/auth.js')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/forumController')
const auth = require('../middleware/auth.js')

router.get('/', auth, controller.index)
router.get('/category', auth, controller.category)
router.post('/category', auth, controller.categoryPost)

module.exports = router

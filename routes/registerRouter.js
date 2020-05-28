const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')

// GET
router.get('/', controller.register)
// Post
router.post('/', controller.registerPost)

module.exports = router

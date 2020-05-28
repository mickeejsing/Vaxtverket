'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')

const credentialsController = {}

credentialsController.login = (req, res) => {
  res.render('pages/login')
}

credentialsController.loginPost = async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password)) === true) {
      console.log('Du är inloggad.')

      req.session.data = {
        role: user.role,
        id: user._id,
        username: user.username,
        password: user.password,
        image: user.imageSrc
      }

      if (req.session.data.role === 'admin') {
        req.session.data.authorized = true
      }

      console.log(req.session.data)
    } else {
      req.session.flash = {
        type: 'fail',
        message: 'Du har angett felaktiga uppgifter.'
      }

      res.redirect('../login')
    }

    res.redirect('/profile')
  } catch (error) {
    console.error(error)
  }
}

credentialsController.register = (req, res) => {
  res.render('pages/register')
}

credentialsController.registerPost = async (req, res, next) => {
  try {
    const password = req.body.password
    const username = req.body.username

    if (password[0] === password[1]) {
      const user = new User({
        username: username,
        password: password[0]
      })

      await user.save()

      res.redirect('/login')
    } else {
      req.session.flash = {
        type: 'fail',
        message: 'Lösenorden du angav stämmer inte överens.'
      }

      res.redirect('/register')
    }
  } catch (error) {
    console.error(error)
  }
}

// Exports
module.exports = credentialsController

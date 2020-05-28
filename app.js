'use strict'

const express = require('express')
const app = express()
const hbs = require('express-hbs')
const path = require('path')
const session = require('express-session')
const helmet = require('helmet')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const updateDB = require('./public/js/updateDB')
var compression = require('compression')

const port = 3000
const mongoose = require('./configs/mongoose')

const options = {
  name: 'flower based cookie',
  resave: false,
  saveUninitialized: false,
  secret: 'digging after worms',
  cookie: {
    maxAge: 1000 * 60 * 60 * 5,
    httpOnly: true,
    sameSite: 'Lax'
  }
}

app.use(compression())
app.use(helmet())
app.use(session(options))
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.1.0' }))

app.use('/uploads', express.static('uploads'))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  next()
})

mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/login', require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))
app.use('/forum', require('./routes/forumRouter'))

io.on('connection', (socket) => {
  console.log('Connected Socket')
})

server.listen(port, () => console.log('Server running at localhost: ' + port))

setInterval(function () {
  const date = new Date()
  const hour = date.getHours()

  if (hour !== 16) {
    updateDB()
  }
}, 1000 * 20)

// Exports
exports.io = io

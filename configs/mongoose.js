'use strict'

const mongoose = require('mongoose')
const DB_CONNECTION_STRING = 'mongodb+srv://dbuser:IHUpuWNq2xqE7gtj@democluster-a5cnt.mongodb.net/plants?retryWrites=true&w=majority'

/**
 * Connecting.
 *
 * @returns {Promise} - Returns a promise.
 */
module.exports.connect = async () => {
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected')
  })

  mongoose.connection.on('error', function () {
    console.error('Mongoose error')
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(() => {
      console.log('Mongoose terminated')
      process.exit(0)
    })
  })

  return mongoose.connect(DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

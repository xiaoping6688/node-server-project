/**
 * MongoDB
 */

var mongoose = require('mongoose')
var config = require('../../config/mongodb')

var connectionString = 'mongodb://' + config.host + ':' + config.port + '/' + config.db

var options = {
  db: {
    native_parser: true
  },
  server: {
    auto_reconnect: true,
    poolSize: 5
  }
}

mongoose.connect(connectionString, options, function (err, res) {
  if (err) {
    console.log('[mongoose] Error connecting to: ' + connectionString + '. ' + err)
    return process.exit(1)
  } else {
    return console.log('[mongoose] Successfully connected to: ' + connectionString)
  }
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'mongoose connection error:'))

db.once('open', function() {
  return console.log('mongoose open success')
})

module.exports = db

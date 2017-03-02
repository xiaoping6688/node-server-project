/**
 * MongoDB
 */

var mongoose = require('mongoose')
var config = require('../../config/mongodb')

var uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.database

mongoose.connect(uri, config.options, function (err, res) {
  if (err) {
    console.log('[mongoose] Error connecting to: ' + connectionString + '. ' + err)
    return process.exit(1)
  } else {
    return console.log('[mongoose] Successfully connected to: ' + connectionString)
  }
})

mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error:'))
mongoose.connection.once('open', function() {
  return console.log('mongoose open success')
})

module.exports = mongoose

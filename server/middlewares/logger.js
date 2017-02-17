/**
 * 日志中间件
 */

var morgan = require('morgan')
var path = require('path')
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')

var logDirectory = path.join(__dirname, '..', '..', 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

module.exports = function (type) {
  return morgan(type, { stream: accessLogStream })
}

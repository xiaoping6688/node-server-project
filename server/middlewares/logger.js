/**
 * 日志中间件
 */

var morgan = require('morgan')
var path = require('path')
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')

var logDirectory = path.join(__dirname, '..', '..', 'logs')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

var logger
if (process.env.NODE_ENV === 'production') {
  logger = morgan('combined', { stream: accessLogStream }) // Standard Apache combined log output
} else {
  logger = morgan('dev', { stream: accessLogStream }) // :method :url :status :response-time ms - :res[content-length]
}

module.exports = logger

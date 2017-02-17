var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mountRoutes = require('mount-routes')
var cors = require('cors')

var logger = require('./server/middlewares/logger')
var authorization = require('./server/middlewares/auth')
var compression = require('./server/middlewares/compress')
var resApi = require('./server/middlewares/api')

// require('./server/utils/mongodb') // init mongodb

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'))
app.set('view engine', 'hbs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json()) // application/json, any Unicode, gzip/deflate
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded, UTF-8, gzip/deflate
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// log middleware
if (app.get('env') === 'development') {
  app.use(logger('dev')) // :method :url :status :response-time ms - :res[content-length]
} else {
  app.use(logger('combined')) // Standard Apache combined log output
}

// api output middleware
app.use(resApi)

// authorization middleware
app.use(authorization)

// gzip compress
app.use(compression)

// This is CORS-enabled for all origins; For a single route: app.get('/api', cors(), rooter)
// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors())

// auto mount routes with routes_folder_path, 'false': dont dump list
mountRoutes(app, path.join(__dirname, 'server', 'routes'), false)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.url.indexOf('/rest/') == 0) {
    res.api_error_code = 404;
    return res.api_error({
      message: 'Not Found'
    })
  } else {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  }
})

// error handlers
// catch api Unauthorized Error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.api_error_code = 401;
    return res.api_error({
      message: 'Invalid Token'
    })
  } else {
    next(err)
  }
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    if (req.url.indexOf('/rest/') == 0) {
      res.api_error_code = err.status || 500;
      return res.api_error({
        message: err.message,
        error: err
      })
    } else {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err
      })
    }
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  if (req.url.indexOf('/rest/') == 0) {
    res.api_error_code = err.status || 500;
    return res.api_error({
      message: err.message,
      error: {}
    })
  } else {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  }
})

module.exports = app

/**
 * 主入口程序
 */

var express = require('express')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mountRoutes = require('mount-routes')
var cors = require('cors')
var path = require('path')

var config = require('./package.json')

var logger = require('./server/middlewares/logger')
var authorization = require('./server/middlewares/auth')
var compression = require('./server/middlewares/compress')
var resApi = require('./server/middlewares/api')
var interceptor = require('./server/middlewares/interceptor')

// require('./server/utils/mongodb') // init mongodb
// require('./server/utils/orm') // init orm
require('./server/utils/hbs') // init hbs

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'))
app.set('view engine', 'hbs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json()) // application/json, any Unicode, gzip/deflate
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded, UTF-8, gzip/deflate
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set resouces root url
app.locals.resoucePath = '/static'
// set resouces version
app.locals.resouceVersion = config.version

// log middleware
app.use(logger)

// api output middleware
app.use(resApi)

// authorization middleware
app.use(authorization)

// interceptor middleware
app.use(interceptor)

// compression middleware
app.use(compression)

// This is CORS-enabled for all origins; For a single route: app.get('/api', cors(), rooter)
// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors())

// auto mount routes with routes_folder_path, 'false': dont dump list
mountRoutes(app, path.join(__dirname, 'server', 'routes'), false)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.path.startsWith('/rest/')) { // for api
    return res.api_error({
      message: 'Not Found'
    })
  } else { // for page
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  }
})

// error handler
// catch unauthorized error and other forward to error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    if (req.path.startsWith('/rest/')) { // for api
      return res.api_error({
        message: 'Invalid Token',
        error: err.message
      })
    } else { // for page
      res.redirect('/login')
    }
  } else {
    next(err)
  }
})

// error handler
// no stacktraces leaked to user for production,
// and will print stacktrace for development
app.use(function (err, req, res, next) {
  if (req.path.startsWith('/rest/')) { // for api
    return res.api_error({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  } else { // for page
    res.status(err.status || 500)
    res.render('error', {
      layout: false,
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  }
})

// Node全局异常捕获
process.on('uncaughtException', function (err) {
  console.error('An uncaught error occurred!')
  console.error(err.stack)
  // Recommend: restart the server
});

module.exports = app

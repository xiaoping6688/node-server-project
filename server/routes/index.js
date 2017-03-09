/**
 * 首页路由
 */

var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Server', content: new Date() })
})

module.exports = router

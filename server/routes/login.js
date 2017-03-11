/**
 * 登录路由
 */

var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('login', { layout: false })
})

module.exports = router

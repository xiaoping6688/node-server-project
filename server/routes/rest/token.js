/**
 * token 续期（一般针对非web项目，不依赖cookie）
 * TODO 检测刷新有效期，防止无限刷新永不过期？
 */

var express = require('express')
var router = express.Router()
var tokenUtil = require('../../utils/token')

router.get('/', function (req, res, next) {
  var oldToken = tokenUtil.getToken(req)
  if (oldToken) {
    var newTokent = tokenUtil.refreshToken(oldToken)
    res.api(newTokent)
  } else {
    res.api_error('No authorization token was found')
  }
})

module.exports = router

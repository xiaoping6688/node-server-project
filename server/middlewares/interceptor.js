/**
 * 拦截器
 */

var tokenUtil = require('../utils/token')

module.exports = function (req, res, next) {
  // 刷新页面Token（注：此处针对单一web项目）
  var oldToken = tokenUtil.getToken(req)
  if (oldToken && tokenUtil.verifyToken(oldToken)) {
    var newTokent = tokenUtil.refreshToken(oldToken)
    res.cookie('token', newTokent)
  }

  // console.log('intercept: ' + req.path)
  next()
}

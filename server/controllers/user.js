/**
 * 用户逻辑控制器
 */

var tokenUtil = require('../utils/token')
var code = require('../../config/error_code')

/**
 * 用户登录
 */
exports.login = function(req, res) {
  var username = req.query.username || ''
  var password = req.query.password || ''

  if (username == '' || password == '') {
    return res.api(null, { code: code.SIGNIN_ERROR, msg:'账号或密码不能为空' })
  }

  // TODO
  var userInfo = {
    id: '123',
    name: '张三',
    gender: 0,
    age: 18
  }

  var token = tokenUtil.generateToken({ uid: userInfo.id })
  res.cookie('token', token)
  return res.api({ token: token, user: userInfo })
}

/**
 * 用户退出
 */
exports.logout = function(req, res) {
  if (req.user) {
    delete req.user
    res.clearCookie('token')
    return res.sendStatus(200)
  } else {
    return res.sendStatus(401)
  }
}

/**
 * 用户查询
 */
exports.getUser = function(req, res) {

}

/**
 * 用户注册
 */
exports.addUser = function(req, res) {

}

exports.updateUser = function(req, res) {

}

exports.delUser = function(req, res) {

}

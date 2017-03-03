/**
 * 用户逻辑控制器
 */

var tokenUtil = require('../utils/token')

var SIGNIN_ERROR_CODE = 10001;
var LOGOUT_ERROR_CODE = 10002;
var REGISTER_ERROR_CODE = 10003;

/**
 * 用户登录
 */
exports.login = function(req, res) {
  var username = req.query.username || ''
  var password = req.query.password || ''

  if (username == '' || password == '') {
    return res.api(401, null, { code: SIGNIN_ERROR_CODE, msg:'账号或密码不能为空' })
  }

  // TODO

  var token = tokenUtil.generateToken({ uid: 123 })
  return res.api({ token: token })
}

/**
 * 用户退出
 */
exports.logout = function(req, res) {
  if (req.user) {
    delete req.user
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
  var username = req.body.username || ''
  var password = req.body.password || ''

  if (username == '' || password == '') {
    return res.sendStatus(400)
  }

  // TODO

  var token = tokenUtil.generateToken({ uid: 123 })
  return res.api({ token: token })
}

exports.updateUser = function(req, res) {

}

exports.delUser = function(req, res) {

}

/**
 * 账号逻辑控制器
 */

var tokenUtil = require('../utils/token')

var SIGNIN_ERROR_CODE = 10001;
var LOGOUT_ERROR_CODE = 10002;
var REGISTER_ERROR_CODE = 10003;

exports.signin = function(req, res) {
  var username = req.body.username || ''
  var password = req.body.password || ''

  if (username == '' || password == '') {
    return res.api(401, null, { code: SIGNIN_ERROR_CODE, msg:'账号或密码不能为空' })
  }

  var token = tokenUtil.generateToken({ uid: 123 })
  return res.api({ token: token })
}

exports.logout = function(req, res) {
  if (req.user) {
    delete req.user
    return res.sendStatus(200)
  } else {
    return res.sendStatus(401)
  }
}

exports.register = function(req, res) {
  var username = req.body.username || ''
  var password = req.body.password || ''

  if (username == '' || password == '') {
    return res.sendStatus(400)
  }


}

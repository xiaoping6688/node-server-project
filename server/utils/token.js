/**
 * JWT token管理
 */

var jwt = require('jsonwebtoken')
var secretKey = require('../../config/secret').token_secret_key

var TOKEN_EXPIRATION = 60 * 60

var secret = Buffer.from(secretKey, 'base64')

exports.generateToken = function (payload) {
  var token = jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRATION })
  return token
}

exports.verifyToken = function (token) {
  try {
    var payload = jwt.verify(token, secret)
    return payload

  } catch (err) {
    return false
  }
}

exports.decodeToken = function (token) {
  var payload = jwt.decode(token)
  return payload
}

exports.refreshToken = function (token) {
  var payload = decodeToken(token)
  var token = jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRATION })
  return token
}

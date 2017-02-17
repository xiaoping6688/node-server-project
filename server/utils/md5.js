/**
 * md5加密（with secret-key）
 */

var md5 = require('blueimp-md5')

var secretKey = require('../../config/secret').md5_secret_key

module.exports = function (value) {
  return md5(value, secretKey)
}

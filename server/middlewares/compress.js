/**
 * 压缩中间价
 * 注：配置nginx来处理压缩和静态文件
 */

var compression = require('compression')

var compressOptions = {
  threshold: 0,
  filter: shouldCompress
}

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) { // don't compress responses
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

module.exports = compression(compressOptions)

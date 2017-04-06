/**
 * 生产环境
 */

module.exports = {
  port: 80,
  logging: {
    type: 'combined' // Standard Apache combined log output
  },
  NODE_ENV: 'production',
  BASE_URI: 'http://ip/api'
}

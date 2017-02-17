/**
 * HTTP数据通信模块
 */

var request = require('request-promise')
var querystring = require('querystring')

// 缺省请求头
var defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json' // application/x-www-form-urlencoded
}

// 请求参数加工
function mutate (uri, options) {
  options = options || {}
  options.headers = options.headers || {}
  options.uri = uri

  Object.assign(options.headers, defaultHeaders)

  if (options.body) {
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
  }

  if (options.qs) {
    if (typeof options.qs === 'object') {
      options.qs = querystring.stringify(options.qs)
    }
    uri += (uri.indexOf('?') !== -1) ? '&' : '?'
    options.uri = uri + options.qs
    options.qs = null
  }

  options.json = true

  return options
}

/**
 * 接口调用服务
 * @param {String} url 接口API（必填）
 * @param {Object} options 请求参数（选填）{headers, body, query, ...options}
 * @return {Object} Promise
 * @throws {Error}
 */
var callService = function (url, options = {}) {
  return request(mutate(url, options))
}

exports.callService = callService

exports.get = function (url, args, options = {}) {
  options.method = 'GET'
  options.qs = args
  return callService(url, options)
}

exports.post = function (url, args, options = {}) {
  options.method = 'POST'
  options.body = args
  return callService(url, options)
}

exports.put = function (url, args, options = {}) {
  options.method = 'PUT'
  options.body = args
  return callService(url, options)
}

exports.patch = function (url, args, options = {}) {
  options.method = 'PATCH'
  options.body = args
  return callService(url, options)
}

exports.del = function (url, args, options = {}) {
  options.method = 'DELETE'
  options.qs = args
  return callService(url, options)
}

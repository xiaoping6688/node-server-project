/**
 * 工具类、实用函数
 */

const Sequelize = require('sequelize')
const trimFunc = require('lodash/trim')
const escapeFunc = require('lodash/escape')
const isEmptyFunc = require('lodash/isEmpty')

/**
 * 找出第一个符合条件的数组成员
 */
exports.findItem = function (arr, key, value) {
  return arr.find(item => item[key] === value)
}

exports.findNameById = function (arr, id) {
  let item = findItem(arr, 'id', id)
  return item ? item.name : ''
}

exports.isObjectLike = function (value) {
  return !!value && typeof value == 'object';
}

exports.isNumber = function (value) {
  return typeof value == 'number' || (this.isObjectLike(value) && Object.prototype.toString.call(value) == '[object Number]')
}

/**
 * 转义sql参数防止注入攻击
 */
exports.escapeSql = function (string) {
  // return Sequelize.escape(string) // XXX
  return escapeFunc(string)
}

/**
 * 去掉字符串前后空白或指定字符
 */
exports.trim = function (string, chars) {
  return trimFunc(string, chars) // es6 String.trim 不支持 chars 参数
}

/**
 * Checks if value is an empty object, collection, map, or set.
 */
exports.isEmpty = function (value) {
  return isEmptyFunc(value)
}

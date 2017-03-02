/**
 * 工具类、实用函数
 */

var Sequelize = require('sequelize')
var trimFunc = require('lodash/trim')
var isEmptyFunc = require('lodash/isEmpty')

/**
 * 找出第一个符合条件的数组成员
 */
export function findItem (arr, key, value) {
  return arr.find(item => item[key] === value)
}

export function findNameById (arr, id) {
  let item = findItem(arr, 'id', id)
  return item ? item.name : ''
}

export function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

export function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && Object.prototype.toString.call(value) == '[object Number]')
}

/**
 * 转义sql参数防止注入攻击
 */
export function escapeSql(string) {
  return Sequelize.escape(string)
}

/**
 * 去掉字符串前后空白或指定字符
 */
export function trim(string, chars) {
  return trimFunc(string, chars) // es6 String.trim 不支持 chars 参数
}

/**
 * Checks if value is an empty object, collection, map, or set.
 */
export function isEmpty(value) {
  return isEmptyFunc(value)
}

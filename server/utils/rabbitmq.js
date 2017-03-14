/**
 * 消息队列，简单实现了消息订阅、发布和RPC调用
 * @see https://github.com/dial-once/node-bunnymq
 * 也可参考 https://github.com/tjmehta/amqplib-rpc 实现方式
 */

var bunnymq = require('bunnymq')
var config = require('../../config/rabbitmq')

var conn = bunnymq(config)
var producer = conn.producer
var consumer = conn.consumer

/**
 * Producer (publisher), can send messages to a named queue.
 */
exports.publish = function (queueName, content) {
  producer.produce(queueName, content)
}

/**
 * Consumer (subscriber), can handle messages from a named queue.
 */
exports.subscribe = function (queueName, callback) {
  consumer.consume(queueName, callback)
}

/**
 * RPC invoking
 * @param {String} queueName 队列名
 * @param {Object} content 传递的参数
 * @param {Function} callback 回调函数，参数为返回值
 */
exports.rpcCall = function (queueName, content, callback) {
  producer.produce(queueName, content, { rpc: true }).then(callback)
}

/**
 * RPC provider
 * @param {String} queueName 队列名
 * @param {Function} handler 处理函数，其返回值可以是普通数据类型或Promise对象
 */
exports.rpcReceive = function (queueName, handler) {
  consumer.consume(queueName, handler)
}

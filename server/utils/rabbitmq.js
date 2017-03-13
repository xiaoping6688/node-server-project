/**
 * 消息队列，简单实现了消息订阅、发布和RPC调用
 * 也可参考 https://github.com/tjmehta/amqplib-rpc 实现方式
 */

var bunnymq = require('bunnymq')

var config = {
  host: 'amqp://localhost', // connect url
  prefetch: 5, // number of fetched messages at once on the channel
  requeue: true, // requeue put back message into the broker if consumer crashes/trigger exception
  timeout: 1000, // time between two reconnect (ms)
  rpcTimeout: 1000 // default timeout for RPC calls. If set to '0' there will be none.
}

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

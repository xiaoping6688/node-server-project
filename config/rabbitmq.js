/**
 * amqp 参数配置
 * @see https://github.com/dial-once/node-bunnymq
 */

module.exports = {
  host: 'amqp://localhost', // connect url
  prefetch: 5, // number of fetched messages at once on the channel
  requeue: true, // requeue put back message into the broker if consumer crashes/trigger exception
  timeout: 1000, // time between two reconnect (ms)
  rpcTimeout: 1000 // default timeout for RPC calls. If set to '0' there will be none.
}

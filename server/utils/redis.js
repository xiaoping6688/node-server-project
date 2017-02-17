/**
 * Redis 缓存
 */

var redis = require('redis')
var redisOptions = require('../../config/redis')

var redisClient = redis.createClient(redisOptions)

redisClient.on('error', function (err) {
  console.log('Error ' + err)
})

redisClient.on('connect', function () {
  console.log('Redis is ready')
})

exports.redis = redis
exports.redisClient = redisClient

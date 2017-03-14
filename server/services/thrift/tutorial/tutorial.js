/**
 * Apache Thrift 是 Facebook 开源的一种高效的、支持多种编程语言的远程服务调用的框架，
 * 采用二进制数据传输，适用于高并发、大数据量和多语言开发环境。
 * @see http://thrift.apache.org/
 *
 * tutorial.thrift 是我们定义好的目标语言对应的接口数据结构，
 * 然后通过thrift命令生成node端相应的引用文件，如下：
 *
 * <code>
 *   thrift --gen js:node -o ./server/services/thrift/tutorial -out ./server/services/thrift/tutorial/gen ./server/services/thrift/tutorial/tutorial.thrift
 * </code>
 *
 * Java端参考：http://qifuguang.me/2015/09/11/Thrift%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/
 */

var thrift = require('thrift')
var Calculator = require('./gen/Calculator')
var ttypes = require('./gen/tutorial_types')

var transport = thrift.TBufferedTransport
var protocol = thrift.TBinaryProtocol

var connection = thrift.createConnection('localhost', 9090, {
  transport : transport,
  protocol : protocol
})

connection.on('error', function(err) {
  console.error(err)
})

// Create a Calculator client with the connection
var client = thrift.createClient(Calculator, connection)

var work = new ttypes.Work()

module.exports = {
  ping: function() {
    client.ping(function(err, response) {
      console.log('ping()')
    })
  },
  add: function(arg1, arg2) {
    client.add(1,1, function(err, response) {
      console.log("1+1=" + response)
    })
  },
  subtract: function(num1, num2) {
    work.op = ttypes.Operation.SUBTRACT
    work.num1 = num1
    work.num2 = num2

    client.calculate(1, work, function(err, message) {
      console.log(`${num1}-${num2}=${message}`)

      client.getStruct(1, function(err, message){
        console.log('Check log: ' + message.value)
      })
    })
  },
  close: function () { //close the connection once we're done
    connection.end()
  }
}

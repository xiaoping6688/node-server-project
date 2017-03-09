/**
 * handlebars 配置及扩展函数
 */

var hbs = require('hbs')
var path = require('path')

var blocks = {}

// 模版继承
hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name]
  if (!block) {
    block = blocks[name] = []
  }

  block.push(context.fn(this)) // for older versions of handlebars, use block.push(context(this));
})

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n')

  blocks[name] = [] // clear the block
  return val
})

// 注册子模版
hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'))

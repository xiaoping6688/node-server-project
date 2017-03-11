/**
 * 对象关系映射（ORM）
 * 基于Promise，支持 Postgres, MySQL, SQLite and Microsoft SQL Server
 */

var Sequelize = require('sequelize')

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
var config = require('../../config/orm')[env]

// Setting up a connection
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
)

// Test the connection
sequelize.authenticate().then(function(err) {
  console.log('Database connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
})

module.exports = sequelize

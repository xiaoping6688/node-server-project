/**
 * 用户模型（orm）
 */

var Sequelize = require('sequelize')
var orm = require('../utils/orm')

var UserModel = orm.define('UserModel', {
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey : true,
    unique : true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
  },
  created_at: {
    type: Sequelize.DATE,
    "defaultValue": Sequelize.NOW
  }
})

module.exports = UserModel

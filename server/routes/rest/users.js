var express = require('express')
var userCtrl = require('../../controllers/users')
var router = express.Router()

// 查询所有用户
router.get('/', userCtrl.getUsers)

// 查询用户
router.get('/:id', userCtrl.getUser)

// 更新用户信息
router.put('/:id', userCtrl.updateUser)

// 新增用户
router.post('/', userCtrl.addUser)

// 删除用户
router.delete('/:id', userCtrl.delUser)

module.exports = router

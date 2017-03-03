var express = require('express')
var userCtrl = require('../../controllers/user')
var router = express.Router()

// 用户登录
router.get('/login', userCtrl.login)

// 用户退出
router.get('/logout', userCtrl.logout)

// 查询所有用户
// router.get('/', userCtrl.getUsers)

// 查询用户
router.get('/:id', userCtrl.getUser)

// 更新用户
router.put('/:id', userCtrl.updateUser)

// 新增用户
router.post('/regist', userCtrl.addUser)

// 删除用户
router.delete('/:id', userCtrl.delUser)

module.exports = router

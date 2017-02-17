var express = require('express')
var accountCtrl = require('../../controllers/account')
var router = express.Router()

router.get('/', accountCtrl.register)

module.exports = router

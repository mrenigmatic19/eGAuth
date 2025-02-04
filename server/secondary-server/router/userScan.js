const express=require('express')
const { authUserJWT } = require('../middleware/auth')
const { userScan } = require('../controller/userScan')
const router=express.Router()


router.get('/scan',authUserJWT,userScan)

module.exports=router
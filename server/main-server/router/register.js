const express=require('express')
const router=express.Router()
const {userRegister}=require('../controller/register')


router.get('/userRegister',userRgister)
router.post('/userRegister',userRegister)

module.exports=router
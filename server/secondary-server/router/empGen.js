const express=require('express')
const router=express.Router()
const {authEmpJWT}=require('../middleware/auth')


router.post('/gen',authEmpJWT,)

module.exports=router
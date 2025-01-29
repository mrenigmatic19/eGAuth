const express=require('express')
const router=express.Router()


router.get('/gen',authenticateJWT)

module.exports=router
const express=require('express')
const router=express.Router()
const {userLogin,empLogin,deptLogin}=require('../controller/login')

// router.get('/userLogin',userLogin)
// router.get('/deptLogin',deptLogin)
// router.get('/empLogin',empLogin)

router.post('/userLogin',userLogin)
router.post('/deptLogin',deptLogin)
router.post('/empLogin',empLogin)

module.exports=router
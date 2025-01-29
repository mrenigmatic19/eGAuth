const express=require('express')
const router=express.Router()
const {authenticateJWT}=require('../middleware/auth')

router.get('/home',)
router.get('/dept',authenticateJWT)

router.get('/user',authenticateJWT)
router.get('/user/scan',authenticateJWT)
router.get('/user/pastScan',authenticateJWT)

router.get('/emp',authenticateJWT)

router.get('/admin',authenticateJWT)
router.get('/admin/addDept',authenticateJWT)
router.post('/admin/addDept',authenticateJWT)
router.get('/admin/allDept',authenticateJWT)

router.get('/dept',authenticateJWT)
router.get('/dept/addEmp',authenticateJWT)
router.post('/dept/addEmp',authenticateJWT)
router.get('/dept/allEmp',authenticateJWT)


module.exports=router
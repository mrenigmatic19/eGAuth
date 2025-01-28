const express=require('express')
const router=express.Router()


router.get('/home',)
router.get('/user',)
router.get('/dept',)

router.get('/user/profile',)
router.get('/user/scan',)

router.get('/official',)
router.get('/official/digitalcard',)
router.get('/official/profile',)

router.get('/admin',)
router.get('/admin/addDept',)
router.post('/admin/addDept',)
router.get('/admin/allDept')

router.get('/dept',)
router.get('/dept/addEmp',)
router.post('/dept/addEmp',)
router.get('/dept/allEmp')


module.exports=router
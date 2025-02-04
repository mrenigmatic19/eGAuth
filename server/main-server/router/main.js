const express = require("express");
const router = express.Router();

// Import authentication middleware
const { authAdminJWT, authDeptJWT, authEmpJWT, authUserJWT } = require("../middleware/auth");

// Import controllers
const { addDept, viewDept } = require("../controller/admin");
const { viewProfile } = require("../controller/employee");
const { viewEmployee, addEmployee } = require("../controller/dept");
const { pastScan, userProfile } = require("../controller/user");

// User Routes (Protected)
router.get("/user", authUserJWT, userProfile);
router.get("/user/pastScan", authUserJWT, pastScan);

// Employee Routes (Protected) 
router.get("/emp", authEmpJWT, viewProfile);

// Admin Routes (Protected)
router.post("/admin/addDept", authAdminJWT, addDept);
router.get("/admin/viewDept", authAdminJWT, viewDept); 

// Department Routes 
router.post("/dept/addEmp", authDeptJWT, addEmployee); 
router.get("/dept/viewEmp", authDeptJWT, viewEmployee); 

module.exports = router;

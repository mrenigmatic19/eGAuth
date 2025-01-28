const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
    DeptName: { type: String, required: true },
    DeptPass: { type: String, required: true },
    DeptID: { type: String, required: true, unique: true },
});

const Department = mongoose.model('Department',DepartmentSchema ,DepartmentSchema);

module.exports={Department}
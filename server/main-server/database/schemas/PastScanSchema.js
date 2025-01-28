const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
    ScanID: { type: String, required: true, unique: true },
    UserAdhar: { type: String, required: true },
    EmpID: { type: String, required: true },
    EmpDeptID: { type: String, required: true },
    EmpSignature: { type: String, default: '' },
});

module.exports = mongoose.model('Employee', ScanSchema);

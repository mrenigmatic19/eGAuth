const express = require('express');
const { decrypt } = require('../functions/aes/crypt');
const { Employee } = require('../database/schemas/EmployeeSchema');
const { key, iv } = require('../functions/retriveKey');
const bcrypt = require('bcrypt');
const { Scans } = require('../database/schemas/PastScanSchema');

const userScan = async (req, res) => {
    try {
        const { qrData } = req.body;
        const { UserID } = req.user;

        const decryptedData = await decrypt(qrData, key, iv);
        const data = decryptedData.split(' ');

        const extractKey = data[0];
        if (extractKey !== key) {
            return res.status(400).json({ error: 'Invalid QR Code' });
        }

        const empData = JSON.parse(data[1]);
        const currentTime = new Date();
        const qrTime = new Date(data[2]);

        const emp = await Employee.findOne({ empId: empData.EmpId });
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const scanID = bcrypt.hashSync(UserID + empData.EmpId + currentTime.toISOString(), 10);

        const scanRecord = new Scans({
            ScanID: scanID,
            UserID,
            EmpID: empData.EmpId,
            EmpDeptID: emp.EmpDeptID, 
            EmpSignature: empData.EmpSignature, 
        });

        
        await scanRecord.save();

        return res.status(200).json({ scanRecord });
    } catch (error) {
        console.error('Error in userScan:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { userScan };

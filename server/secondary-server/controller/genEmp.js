const express = require('express');
const { key, iv } = require('../functions/retriveKey');
const { encrypt } = require('../functions/aes/crypt.js');
const { generateQR } = require('../functions/qr/qr.js');
const { Employee } = require('../database/schemas/EmployeeSchema');

const genEmp = async (req, res) => {
    try {
        const { empId } = req.user;
        
        // Fetch employee data
        const employeeData = await Employee.findOne({ empId });
        if (!employeeData) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Generate encrypted data for QR code
        const currentTime = new Date().toISOString(); // Ensure correct timestamp
        const dataString = key+" "+ JSON.stringify(employeeData) +" "+ currentTime;
        const qrData = await encrypt(dataString, key, iv);
        
        // Generate QR Code
        const qrCode = await generateQR(qrData);
        
        return res.status(200).json({ qrCode });
    } catch (error) {
        console.error('Error in genEmp:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { genEmp };

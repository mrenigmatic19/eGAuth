const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Department=require('../database/schemas/DeptSchema')


const addDept = async (req, res) => {
    try {
        const { DeptName, DeptPass, DeptID } = req.body;

        if (!DeptName || !DeptPass || !DeptID) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingDept = await Department.findOne({ DeptID });
        if (existingDept) {
            return res.status(400).json({ error: 'Department ID already exists' });
        }

       
        const hashedPass = await bcrypt.hash(DeptPass, 10);

       
        const newDepartment = new Department({
            DeptName,
            DeptPass: hashedPass,
            DeptID,
        });

        await newDepartment.save();

        return res.status(201).json({ message: 'Department added successfully', department: newDepartment });
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const viewDept = async (req, res) => {
    try {
        
        const allDept = await Department.find({});
        
        
        res.status(200).json({ departments: allDept });
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 


module.exports = { addDept, viewDept };
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Employee = require('../database/schemas/EmployeeSchema'); 


const addEmployee = async (req, res) => {
    try {
        const { 
            EmpID, 
            EmpName, 
            EmpPassword, 
            EmpContact, 
            EmpDesignation, 
            EmpPosting 
        } = req.body;
        
         const { EmpDeptID, 
            EmpDeptName } = req.user;
      
        if (!EmpID || !EmpName || !EmpPassword || !EmpContact || !EmpDesignation || !EmpPosting) {
            return res.status(400).json({ error: 'All fields are required except EmpSignature' });
        }

        
        const existingEmployee = await Employee.findOne({ EmpID });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee ID already exists' });
        }

        
        const hashedPass = await bcrypt.hash(EmpPassword, 10);

        
        const newEmployee = new Employee({
            EmpID,
            EmpName,
            EmpDeptID,
            EmpDeptName,
            EmpSignature: '', 
            EmpPassword: hashedPass,
            EmpContact,
            EmpDesignation,
            EmpPosting,
        });

        await newEmployee.save();

        return res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// View Employees
const viewEmployee = async (req, res) => {
    try {
        // Fetch all employees from the database
        const {EmpDeptID}=req.qeury
        const allEmployees = await Employee.find({EmpDeptID});
        
        res.status(200).json({ employees: allEmployees });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addEmployee, viewEmployee };

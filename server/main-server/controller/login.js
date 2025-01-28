const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../database/schemas/EmployeeSchema');
const User = require('../database/schemas/UserSchema');
const Department = require('../database/schemas/DeptSchema');


const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';


const userLogin = async (req, res) => {
  const { UserID, password } = req.body;

  try {
    const user = await User.findOne({ UserID });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
      
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    }

    return res.status(400).json({ message: 'Incorrect password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const empLogin = async (req, res) => {
  const { EmpID, EmpPassword } = req.body;

  try {
    const employee = await Employee.findOne({ EmpID });
    if (!employee) {
      return res.status(400).json({ message: 'Employee not found' });
    }

   
    if (await bcrypt.compare(EmpPassword, employee.EmpPassword)) {
     
      const token = jwt.sign({ id: employee._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    }

    return res.status(400).json({ message: 'Incorrect password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deptLogin = async (req, res) => {
  const { DeptID, DeptPass } = req.body;

  try {
    const department = await Department.findOne({ DeptID });
    if (!department) {
      return res.status(400).json({ message: 'Department not found' });
    }

   
    if (await bcrypt.compare(DeptPass, department.DeptPass)) {
      
      const token = jwt.sign({ id: department._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    }

    return res.status(400).json({ message: 'Incorrect password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
    const { UserID, password } = req.body;
  
    try {
      const user = await User.findOne({ UserID });
      if (!user) {
        return res.status(400).json({ message: 'Admin not found' });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
      }
  
      return res.status(400).json({ message: 'Incorrect password' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  userLogin,
  empLogin,
  deptLogin,
};

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../database/schemas/EmployeeSchema');
const User = require('../database/schemas/UserSchema');
const Department = require('../database/schemas/DeptSchema');


const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const JWT_EMP_SECRET = process.env.JWT_EMP_SECRET;
const JWT_DEPT_SECRET = process.env.JWT_DEPT_SECRET;


const userLogin = async (req, res) => {
  const { UserID, Password } = req.body;

  if (!Password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const user = await User.findOne({ UserID });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.Password) {
      return res.status(400).json({ message: 'Password not set for user' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (isMatch) {

      if(user.UserID == 'Admin'){
        const token = jwt.sign({ id: user.UserID }, JWT_ADMIN_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
      }
      else{
        const token = jwt.sign({ id: user.UserID }, JWT_USER_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
      }
     
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
     
      const token = jwt.sign({ EmpID: employee.EmpID ,EmpName:employee.EmpName}, JWT_EMP_SECRET, { expiresIn: '1h' });
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
    console.log(department);
    if (!department) {
      return res.status(400).json({ message: 'Department not found' });
    }

   
    if (await bcrypt.compare(DeptPass, department.DeptPass)) {
      
      const token = jwt.sign({ DeptID: department.DeptID,DeptName:department.DeptName }, JWT_DEPT_SECRET, { expiresIn: '1h' });
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

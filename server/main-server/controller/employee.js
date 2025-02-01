const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../database/schemas/EmployeeSchema');


const viewProfile = async (req, res) => {
  try {
    const { empID } = req.body;

    if (!empID) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const empData = await Employee.findOne({ empID });

    if (!empData) {
      return res.status(404).json({ error: "User not found" });
    }

  
    return res.status(200).json({ data: empData });

  } catch (err) {
    console.error("Error while fetching profile:", err);

    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  viewProfile,
};

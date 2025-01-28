const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const allscans = require('../database/schemas/PastScanSchema');
const { scanChannel } = require('../function/rabbitMQ');

// Fetch past scan data based on userAdhar and employeeID
const pastScan = async (req, res) => {
    try {
        const { userAdhar, employeeID } = req.body;

        
        if (!userAdhar || !employeeID) {
            return res.status(400).json({ error: 'Both userAdhar and employeeID are required' });
        }

        // Fetch scan data from the database
        const data = await allscans.find({ userAdhar, employeeID });

        // Check if no data is found
        if (!data.length) {
            return res.status(404).json({ message: 'No scans found for the given userAdhar and employeeID' });
        }

        // Return the found scan data
        return res.status(200).json({ scans: data });
    } catch (err) {
        console.error('Error fetching scans:', err);

        
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const userProfile = async (req, res) => {
    try {
    
        res.status(200).json({ message: 'User profile logic not implemented yet' });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    pastScan,
    userProfile
};

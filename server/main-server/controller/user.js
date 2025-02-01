const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const allscans = require('../database/schemas/PastScanSchema');
const User = require('../database/schemas/UserSchema'); 

const pastScan = async (req, res) => {
    try {
        const UserID = req.user.id;
        
        
        const data = await allscans.find({ userID });

        // Check if no data is found
        if (!data.length) {
            return res.status(404).json({ message: 'No scans Till now' });
        }

        return res.status(200).json({ scans: data }); 
    } catch (err) {
        console.error('Error fetching scans:', err);

        
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userProfile = async (req, res) => {
    try {
       
        const UserID = req.user.id;
        console.log(UserID)
        
        const user =await User.findOne({ 
                   UserID 
                  });
      
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user details
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    pastScan,
    userProfile
};

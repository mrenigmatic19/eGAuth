const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../database/schemas/UserSchema'); 

const userRegister = async (req, res) => {
    try {
        const { UserID,UserAdhar, UserName, Password, userConfirmPass } = req.body;
        console.log(UserID ,UserAdhar ,UserName ,Password ,userConfirmPass)

        if (!UserID || !UserAdhar || !UserName || !Password || !userConfirmPass) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (Password !== userConfirmPass) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const isAlready = await User.findOne({ 
           UserAdhar 
          });
            
        if (isAlready) {
            return res.status(400).json({ error: 'User with this Aadhar already exists' });
        }
        const isAlread= await User.findOne({ 
            UserID 
           });

        if (isAlread) {
            return res.status(400).json({ error: 'User with this ID already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(Password, 10);

        
        const newUser = new User({
            UserID,
            UserAdhar,
            UserName,
            Password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { userRegister };

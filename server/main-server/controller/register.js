const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../database/schemas/UserSchema'); 

const userRegister = async (req, res) => {
    try {
        const { userAdhar, userName, userPassword, userConfirmPass } = req.body;


        if (!userAdhar || !userName || !userPassword || !userConfirmPass) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (userPassword !== userConfirmPass) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        
        const isAlready = await User.findOne({ userAdhar });
        if (isAlready) {
            return res.status(400).json({ error: 'User with this Aadhar already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        
        const newUser = new User({
            userAdhar,
            userName,
            userPassword: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { userRegister };

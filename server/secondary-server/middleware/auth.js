const jwt = require('jsonwebtoken');
const User = require('../database/schemas/UserSchema'); 


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user;

    next();
  });
};

module.exports = {authenticateJWT};

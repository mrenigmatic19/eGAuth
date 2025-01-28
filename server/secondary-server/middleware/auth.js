const jwt = require('jsonwebtoken');
const User = require('../database/schemas/UserSchema'); // Adjust the path as needed

// JWT Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    
    // Optional: Attach user information to the request object
    req.user = user;
    
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;

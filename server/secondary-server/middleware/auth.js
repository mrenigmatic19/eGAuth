const jwt = require('jsonwebtoken');

const authUserJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_USER_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    
   
   req.user= user; // Accessing UserID
    next(); 
  }); 
  
};
 
const authEmpJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_EMP_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    
   
   req.user= user; // Accessing UserID
    next(); 
  }); 

};
module.exports ={ authEmpJWT, authUserJWT };
 
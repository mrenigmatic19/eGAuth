const mongoose = require('mongoose');

const user = process.env.DB_USER;  
const db_password = process.env.DB_PASSWORD;

// MongoDB Atlas connection URI
const uri = `mongodb+srv://${user}:${db_password}@cluster0.dncvi.mongodb.net/eGAuth?retryWrites=true&w=majority`;

// Mongoose connection setup
mongoose.connect(uri, {
  useNewUrlParser: true,  // Optional: Use the new URL parser
  useUnifiedTopology: true,  // Optional: Use the new topology engine
})
.then(() => {
  console.log("Successfully connected to MongoDB with Mongoose!");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

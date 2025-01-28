const mongoose = require('mongoose');

const uri = "mongodb+srv://ritikchaurasia186:<db_password>@cluster0.dncvi.mongodb.net/eGAuth?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
}).catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
});

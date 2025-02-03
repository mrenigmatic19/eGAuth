const express = require('express')
require('dotenv').config({path:'./../.env'});
const {setupConnection,setupConsumer}=require("./functions/retriveKey")

require('./database/db')
const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
 

(async () => {
    try {
        const connection = await setupConnection();
        
        await setupConsumer(connection);
      
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();


// const empGen=require("./router/emoGen")
// const userScan=require("./router/userScan") 

   

app.listen(9000,()=>{
    console.log("server is running")
})
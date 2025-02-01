const express = require('express')
require('dotenv').config({path:'./../.env'});
const {setupRabbitMQ,setupKeyChannel}=require("./functions/genKey")

require('./database/db')
const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
 

(async () => {
    try {
        const connection = await setupRabbitMQ();
        
        await setupKeyChannel(connection);
      
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();


const login=require("./router/login")
const register=require("./router/register") 
const main=require("./router/main") 
app.use("/m",main)
app.use("/login",login)
app.use("/register",register)


app.listen(8000,()=>{
    console.log("server is running");
})
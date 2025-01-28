const express = require('express')
const {setupConnection,setupConsumer}=require("./functions/retriveKey")



const app=express();
app.use(express.urlencoded({extended:false}))

(async()=>{
   
    try {
        // Step 1: Setup the connection
        const connection = await setupConnection();
        console.log('Connection established successfully');

        // Step 2: Setup the consumer
        await setupConsumer(connection);
        console.log('Consumer setup successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})()


app.use('/user',)
app.use('/emp',)

app.listen(8000,()=>{
    console.log("server is running");
})
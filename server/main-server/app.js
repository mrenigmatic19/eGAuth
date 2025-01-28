const express = require('express')
const {setupRabbitMQ,setupConsumer}=require("./functions/genKey")



const app=express();
app.use(express.urlencoded({extended:false}))

(async()=>{
   
        try {
            // Step 1: Setup the connection
            const connection = await setupRabbitMQ();
            console.log('Connection established successfully');
    
            // Step 2: Setup the consumer
            await setupConsumer(connection);
            console.log('Consumer setup successfully');
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    })()


app.use('/',)
app.use('/login',)
app.use('/register',)


app.listen(8000,()=>{
    console.log("server is running");
})
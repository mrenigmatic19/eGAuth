const express = require('express')
const {setupRabbitMQ}=require("./function/rabbitMQ")



const app=express();
app.use(express.urlencoded({extended:false}))

(async()=>{
    await setupRabbitMQ();
})()


app.use('/',)
app.use('/login',)
app.use('/register',)


app.listen(8000,()=>{
    console.log("server is running");
})
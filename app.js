const express = require('express')
const dotenv = require('dotenv') 
const connectDatabase = require('./helpers/database/connectDataBase')
const routes = require('./routes')

//Environment Variable
dotenv.config({path:"./config/env/config.env"})

// MongoDb Connection
connectDatabase();


//Create Our server
const app = express()
app.use(express.json())
const PORT = process.env.PORT



// Routes

app.use("/api",routes);

//Starting Server 
app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV}`);
})








app.listen()
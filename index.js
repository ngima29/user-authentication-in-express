require('dotenv').config()
const express = require('express')
const cors =require('cors')
const app = express()
const connectDB = require('./config/connectDB.js')
const userRoute = require('./routes/userRoutes.js')
//
const port = process.env.PORT
const database = process.env.DATABASE

// corse policy
app.use(cors())

// json
app.use(express.json())
//database connect
connectDB(database)



// routes
app.use('/api/user',userRoute)






app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
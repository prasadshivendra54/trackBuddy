const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const habitRoute = require('./Routes/habitRoute')
const userRoute = require('./Routes/userRoute')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


// Root endpoint
app.get("/", (req, res) => {
    res.send({ message: "Welcome To TrackBuddy Backend System!" });
});

// DB connection and start server
mongoose.connect(process.env.URI)
.then(() =>{
    console.log("Database Connected")
    app.listen(process.env.PORT || 1000, (err) => {
        if(err) {
            console.log(err)
        }else{
            console.log(`Server runing... at, http://localhost:${process.env.PORT}`)
        }
    })
})
.catch((error) =>{
    console.log('error', error)
})


app.use('/api', habitRoute)
app.use('/api', userRoute)
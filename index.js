const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
console.log(process.env.NODE_ENV)

// connect to DB
const DB= (process.env.DATABASE).replace('<password>',process.env.PASSWORD)

    mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("mongoose connected"))

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send("ok")
})

//route middleware
const routes= require('./modules/users/routes/routes')
const posts= require('./modules/posts/routes/post-routes')

app.use('/api/user',routes)
app.use('/api/post',posts)

const port = (process.env.PORT,1000)
app.listen(port, (req, res) => {
    console.log('listening from port 1000 ...');
})
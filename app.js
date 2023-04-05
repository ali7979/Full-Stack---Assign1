const express = require('express')
const connectdb = require('./db/Connect')
const mongoose=require('mongoose')
const app = express()
const port = 5000

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin,X-Requested-With,Content-Type,Accept');
   
    next();
});

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend Runnig')
})

connectdb();

app.use("/api",require("./routes/Routes"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
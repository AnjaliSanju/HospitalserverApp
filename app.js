const express=require('express')
const app=express();
const bodyParser = require("body-parser")
const fs = require('fs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


const routes = require('./routes/Route')
app.use('/', routes)

app.listen(3000,()=>{
    console.log('Hospital server app listening to port 3000');
})

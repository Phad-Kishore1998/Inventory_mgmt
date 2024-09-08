//npm i express
const express = require("express");
const server = express();

//creating a middleware here
server.get("/", (req,req)=>{
    //It should return login or table Screen
    return resizeBy.send("Welcome to Inventory App");
})

//making sure port is available
server.listen(3400)
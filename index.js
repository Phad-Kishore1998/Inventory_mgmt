//npm i express
//const express = require("express"); // no more require as mjs / type module in json package
import express from 'express'

const server = express();
import ProductController from "./src/controllers/product.controller.js";

//we create instance of ProductController to call the method in it.
const productController = new ProductController()

//creating a middleware here
// server.get("/", (req,req)=>{
//     //It should return login or table Screen
//     return resizeBy.send("Welcome to Inventory App");
// })


//get request
server.get('/', productController.getProducts)

//Already specified view
server.use(express.static('src/views'))

//making sure port is available
server.listen(3400)
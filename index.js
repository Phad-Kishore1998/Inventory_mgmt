//npm i express
//const express = require("express"); // no more require as mjs / type module in json package
import express from 'express'
import path from 'path'

const server = express();
import ProductController from "./src/controllers/product.controller.js";

//setup view Engine settings
server.set('view engine','ejs')
server.set('views', path.join(path.resolve(),'src','views'))
//We just need to specify the folder where our views present.

//creating a middleware here
// server.get("/", (req,req)=>{
//     //It should return login or table Screen
//     return resizeBy.send("Welcome to Inventory App");
// })

//we create instance of ProductController to call the method in it.
const productController = new ProductController()
//get request
server.get('/', productController.getProducts)

//Already specified view
server.use(express.static('src/views'))

//making sure port is available
server.listen(3400)
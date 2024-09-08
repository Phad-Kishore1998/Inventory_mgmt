//npm i express
//const express = require("express"); // no more require as mjs / type module in json package
import express from 'express'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

const server = express();
import ProductController from "./src/controllers/product.controller.js";

//setup view Engine settings
server.set('view engine','ejs')
server.set('views', path.join(path.resolve(),'src','views'))
//We just need to specify the folder where our views present.

server.use(ejsLayouts) //middleware after setting app and views.

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


//https://www.npmjs.com/package/express-ejs-layouts
//"express-ejs-layouts": "^2.5.1"
//Layouts basically becomes middle ware which wraps other views inside it


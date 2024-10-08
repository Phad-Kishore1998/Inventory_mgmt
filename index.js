import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';

const app = express();
const productsController =
  new ProductsController();

//like this ejslayout it applys middleware to all the request of application
app.use(ejsLayouts);
app.use(express.json());
//Why we are doing this so that JS can be directly exist in our views
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/', productsController.getProducts);
app.get(
  '/new-product',
  productsController.getAddProduct
);

// app.get(
//   '/update-product',
//   productsController.getUpdateProductView
// );

//Cannot GET /update-product/1 
//This means that there is no URL to route (handle the request)
//As our previous url is not handling passed parameter.
//We need a placeholder so that the value in it can be later on accessible on Controller.

app.get(
  '/update-product/:id',
  productsController.getUpdateProductView
);

//post request on the url for update the data
app.post(
  '/update-product', 
  productsController.postUpdateProduct
);

//all the request from the anchor tags are get request
app.post(
  '/delete-product/:id',
  productsController.deleteProduct
);

//here we add the validation middleware before calling postAddProducts
app.post('/', 
   uploadFile.single('imageUrl'), //returns a single file associated with the given form field
   validationMiddleware, //validate expect a form data and can not process multipart data
   productsController.postAddProduct);

app.listen(3400, () => {
  console.log('Server is running on port 3400');
});



/*====================Code Before index.ejs===================


//npm i express
//const express = require("express"); // no more require as mjs / type module in json package
import express from 'express'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

const server = express();
import ProductController from "./src/controllers/product.controller.js";


// parse form data
//extended option : allowa to choose between parsing the url-encoded data with
//querystring library (when false) or the qa library(when true)
server.use(express.urlencoded({extended: true})) //it returns middleware that only parses urlencoded bodies and only
//looks at requests where the Content-Type header matches the type option
//Take the data and parse it and put inside the body.


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
server.get('/new', productController.getAddForm) //seeing the form
//When the form is submitting its post type so it should be post
server.post('/', productController.addNewProduct) 
//on the same url we are doing post with diff. fun


//Already specified view
server.use(express.static('src/views'))

//making sure port is available
server.listen(3400)


//https://www.npmjs.com/package/express-ejs-layouts
//"express-ejs-layouts": "^2.5.1"
//Layouts basically becomes middle ware which wraps other views inside it


*/
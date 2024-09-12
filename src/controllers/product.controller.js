
//Data validation is important as attacks like sql injection, etc is dangerous.
//Validation on data is important and then we keep it on server validation

import ProductModel from '../models/product.model.js';

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null,
    });
    //if we dont send the error Message we get the Error errorMessage is not defined.
  }

  //Single responsibility of the function
  //As function gets change due to multiple reason 
  //base functionality of the controller is to provide res to the req asked only this.
 
  postAddProduct(req, res, next) {
    //controller does need to know about its middleware its not his responsibility
     //ProductModel.add(req.body);
    const {name, desc, price} = req.body;
    const imageUrl = 'images/' + req.file.filename; 
    //req.file.filename added by middleware in request object
    ProductModel.add(name,desc, price, imageUrl);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  getUpdateProductView(req, res, next) {
    //1. If product exists then return view
    //const {id}=req.body; //getting the id from the request
    //Since the id is not in the request but in the url we use
    const id=req.params.id;
    //it allows to access all the parameters in the url
    const productFound = ProductModel.getById(id);

    if(productFound){
      res.render('update-product', {
        product: productFound, //returning the product
        //Enchanement: Since we are already passing the product here and we want to 
        //have existing value prefilled in the form of update.
        errorMessage:null,
      }); //this is the view for update product
      //since we want to see the existing details as well we pass the products as data

    } else {
      //2. else show error.
      res.status(401).send("Product not found");
      //We have the Option to send the Error Page like Not Found TO_DO
    }
    //To avoid the error Product not found we have to pass the id in the URL but how?

  }

  postUpdateProduct(req, res){
    //Mostly similar to Add Product only to function for update
    ProductModel.update(req.body); //simply call the update function of the model.
    var products = ProductModel.getAll();
    res.render('index', { products });
  }
  
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(!productFound){
      return res
      .status(401)
      .send("Product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

}

export default ProductsController;




/*
============================Previous Work Code==================================
It works till adding a new Product in the homepage list==========================


//ES6 module syntax
import path from 'path'
import ProductModel from '../models/product.model.js'; //accessing data in controller
//since method get is static we can simply use it

export default class ProductController {

    //it returns the html file which we have in view folder
    //its kind of middleware having access to request and response
    getProducts(req, res){
        
//===========================Comment Here 2Start ========================

            //function is from express we have to specify the path of file
        console.log(path.resolve()); // Error: ENOENT: no such file or directory, stat '/workspaces/Inventory_mgmt/index.html'
        res.sendFile(path.join(path.resolve(),'','index.html')) //using path module 
            //path.resolve gives the path of current directory gives the controller path

            //We get the error as its expecting the path to be in the same directory as
            //index.js but its not the case for index.html

        /   /Question is path.resolve should give the current directory which is controller
            //But its giving index.js path.
            //Answer: path.resolve() gives you the Path of current executing directory.
            //so we are in root directory and we have to go in 'src','views'
            //and not using any / \ as mac and windows issue
           
//===========================Comment Here 2 End ========================
        
        let products = ProductModel.get();
        console.log(products); //We are able to retrive data from the files in Models.
            //Now the question is to place this data in the html content of products.html
            //That is adding model data in view. Using View Engines (template Engines).
            //To send data and ejs from the controler
            //as we have already specified the views in the server only say products
        res.render("products", {products:products})
            //what ever keys we are specifying here "products"
            //same have to be used in html as well.

            // return res.sendFile(
            //     path.join(path.resolve(),'src','views','products.html')
            // ) //using path module 

    }

    //Another Controller method which will return the form which first they need to 
    //see the form and submit the form (request second)
    getAddForm(req, res) {
            //as data is optional attribute no need to send any data.
        return res.render('new-product'); //we are returning a form and ending the request here
            //https://organic-cod-7pprg6pjrppfx46x-3400.app.github.dev/new
            //we are seeing the form.
    }

    //adding data from the form
    addNewProduct(req, res) {
            //Before adding the data we do the validation

            //getting data from form and printing on console.
        console.log(req.body)
            //we pass all the data to model from controller
        ProductModel.add(req.body)
        let products = ProductModel.get();
            //before rendering get the data from the form
        
            //return res.render('products', {products})
            //if we wont redirect the post will be called causing resubmission again and again
        
        return res.redirect('/')
    }

}


======================================Comments Here============================================

Dynamic content to be added in HTML file
let message ="A message from MARS";

<p> A message from MARS</p>
<p> <%=message%></p> // Syntax for view Engine
:=> idea is to access the js variable in html Content.

In express we use ejs. As ejs is very similar to HTML.

https://www.npmjs.com/package/ejs : get it from here

Features:
Control flow with <% %>
Escaped output with <%= %> (escape function configurable)
Unescaped raw output with <%- %>
Newline-trim mode ('newline slurping') with -%> ending tag
Whitespace-trim mode (slurp all whitespace) for control flow with <%_ _%>
Custom delimiters (e.g. [? ?] instead of <% %>)
Includes
Client-side support
Static caching of intermediate JavaScript
Static caching of templates
Complies with the Express view system

npm i ejs to install it

Now inform our server that we are using view Engine

Browser dont understand ejs :=> After rendering our code in html will be hardcode.
but ejs will work and handle.

but before this we update the controller that it will return the ejs and also send product data.
because browser dont understand ejs convert the rendered js part in html file to plain html
and then renders it on browser.





*/
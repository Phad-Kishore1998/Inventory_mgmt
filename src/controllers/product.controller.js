//ES6 module syntax
import path from 'path'

export default class ProductController {

    //it returns the html file which we have in view folder
    //its kind of middleware having access to request and response
    getProducts(req, res){
        //function is from express we have to specify the path of file
        console.log(path.resolve()); // Error: ENOENT: no such file or directory, stat '/workspaces/Inventory_mgmt/index.html'
        /*
        res.sendFile(path.join(path.resolve(),'','index.html')) //using path module 
        //path.resolve gives the path of current directory gives the controller path

        //We get the error as its expecting the path to be in the same directory as
        //index.js but its not the case for index.html

        //Question is path.resolve should give the current directory which is controller
        //But its giving index.js path.
        //Answer: path.resolve() gives you the Path of current executing directory.
        //so we are in root directory and we have to go in 'src','views'
        and not using any / \ as mac and windows issue
        */
        res.sendFile(path.join(path.resolve(),'src','views','products.html')) //using path module 
        
    }
}
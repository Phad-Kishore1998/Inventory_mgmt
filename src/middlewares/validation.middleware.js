//Express has a by default its validator 3rd party npm i express-validator
import { body, validationResult } from "express-validator";

//export default : it expect three things
//HoistedDeclaration => a function (Not a arrow function)
//Class
//assignment expression

//how to apply to a specific request.
//async for await Promise
const validateRequest = async (req, res, next) => {
    //Every Middle ware has access to request response 
    //next (pointer to the next middleware in sequence)

//==================Code Below is written by us============================
    // // validate data
    // //Extracting data to validate
    // const { name, price, imageUrl } = req.body;
    // let errors = []; //if we define let errors;
    //                 //we get error like properties of undefined {reading 'push'}
    // //Name Validation
    // if (!name || name.trim() == '') {
    //   errors.push('Name is required');
    // }

    // //Price Validation
    // if (!price || parseFloat(price) < 1) {
    //   errors.push(
    //     'Price must be a positive value'
    //   );
    // }

    // //URL Validation using JS URL validation
    // try {
    //   const validUrl = new URL(imageUrl);
    // } catch (err) {
    //   errors.push('URL is invalid');
    // }
    // if (errors.length > 0) {
    //   return res.render('new-product', {
    //     errorMessage: errors[0],
    //   });
    // }
//==================WE replace above code with 3rd Party Validation============================
    //1.Setup the rules for validation (Like if empty then error)
    const rules=[
      //rules on the individual fields for this we import the body from the express validator
      body('name').notEmpty().withMessage("Name is required"),
      body('price').isFloat({gt:0}).withMessage("Price should be positive Value"),
      body('imageUrl').isURL().withMessage("Invalid url"),
    ];
    //2. Run those rules
    await Promise.all(
      rules.map((rule)=>rule.run(req))
    );
    //3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req); //returns the error list 
    console.log(validationErrors);
    
    //4. if errors, return the error message
    if(!validationErrors.isEmpty()){
        return res.render('new-product', {
          errorMessage: validationErrors.array()[0].msg,
          // it is sending the object  errorMessage: validationErrors.array()[0]
        });
    }

    next();
};

export default validateRequest;

/*

If a piece of code(Function) is performing two action its called tightly coupled
express provided liberty of middleware to introduce to avoid this. 
*/
//export default : it expect three things
//HoistedDeclaration => a function (Not a arrow function)
//Class
//assignment expression

//how to apply to a specific request.
const validateRequest = (req, res, next) => {
    //Every Middle ware has access to request response 
    //next (pointer to the next middleware in sequence)

    // validate data
    //Extracting data to validate
    const { name, price, imageUrl } = req.body;
    let errors = []; //if we define let errors;
                    //we get error like properties of undefined {reading 'push'}
    //Name Validation
    if (!name || name.trim() == '') {
      errors.push('Name is required');
    }

    //Price Validation
    if (!price || parseFloat(price) < 1) {
      errors.push(
        'Price must be a positive value'
      );
    }

    //URL Validation using JS URL validation
    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      errors.push('URL is invalid');
    }

    if (errors.length > 0) {
      return res.render('new-product', {
        errorMessage: errors[0],
      });
    }
    next();
};

export default validateRequest;

/*

If a piece of code(Function) is performing two action its called tightly coupled
express provided liberty of middleware to introduce to avoid this. 
*/
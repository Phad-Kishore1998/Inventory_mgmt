export default class ProductModel {
  constructor(id, name, desc, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  static getAll() {
    return products;
  }

  //no more productObj
  static add(name, desc, price, imageUrl) {
    let newProduct = new ProductModel(
      products.length + 1, //this approach is not good as when we delete a product there will
      //similar ids as id depends on the length DB will handle it better way.
      // productObj.name,
      // productObj.desc,
      // productObj.price,
      // productObj.imageUrl //filename or the url is a different object now 
      name,
      desc,
      price,
      imageUrl

    );
    products.push(newProduct);
  }

  //Using for Udpdate the product
  static getById(id) {
    return products.find((p) => p.id == id);
  }

  //Function for post update call in controller
  static update(productObj){
    //updating a item inside the array
    const index = products.findIndex(
      (p) => p.id == productObj.id
      //we find the index of the id to update
    );
    //on that index we replace the object values
    products[index] = productObj;
  }

  static delete(id) {
    const index = products.findIndex(
      (p) => p.id == id
      //we find the index of the id to update
    );
    products.splice(index, 1);
  }

}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 10',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'
  ),
];


/*=========================Code before index.ejs 

export default class ProductModel{

    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl
    }
    static get(){
        return products;
    }

    static add(productObj) {
      //id will be generate automatically and here we are appending the data
      let newProduct = new ProductModel(
        products.length + 1, 
        productObj.name, 
        productObj.desc, 
        productObj.price, 
        productObj.imageUrl
      )
      products.push(newProduct);
    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]

  */
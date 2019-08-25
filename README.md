# MINI-WP

##Link deploy 
<br>
[mini-wp.adielpratama.com](http://mini-wp.adielpratama.com "Mini-Wp")

## Installation
run this command before use this application :)

```javascript
npm i

npm run dev
```

## Environment
PORT= your port

secret_key= secret key for your jwt

SECRET_PASSWORD= secret password for google sign in

CLOUD_BUCKET= your google cloud bucket name 

GCLOUD_PROJECT= your google cloud project id

FILE_PATH=your google credential json file path

client_id=your google client id from api credential for google sign in

uri=your mongo db collection url 
<br>
## This table below is routes of User:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/user` | POST | `Body` <br>username: String <br>password:String<br>email:String | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | create User
`/user/signIn` | POST | `Body`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`404` Not Found | manual Login 
`/user/signInGoogle` | POST | `Body`<br>id_token: String | `200` OK<br>**Fail**<br>`500` Internal Server error | Sign In with google
`/user/checkToken` | POST | `headers`<br>token: String | `200` Correct<br>**Fail**<br>`500` Internal Server error | Checking localStorage token

## This table below is routes of Product:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/product` | POST | `Headers` <br>token: `String`<br>`Body`<br>name: `String`<br>details: `String`<br>image: `file`<br>stock: `number`<br>price: `number` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create Product
`/product` | GET | `Headers` <br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get all product
`/product/:id` | PUT | `Headers`<br>token: `String`<br>`Body`<br>name: `String`<br>details: `String`<br>image: `file`<br>stock: `number`<br>price: `number` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | update one of Product
`/product/:id` | DELETE | `Headers`<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete one Of Product

## This table below is routes of Cart:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/cart/addToCart` | POST | `Headers` <br>token: `String`<br>`Body`<br>productId: `String`<br>quantity: `Number` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create cart
`/cart/buyProduct` | POST | `Headers` <br>token: `String`<br>`Body`<br>userId: `String`<br>address: `String`<br>zipCode: `Number`<br>phoneNumber: `Number` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | update cart into checkout status and create transaction document
`/cart/findUserCart` | GET | `Headers` <br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get user cart
`/cart/findUserTransaction` | GET | `Headers`<br>token: `String`<br> | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | get user transaction
`/cart/deleteCart/:id` | DELETE | `Headers`<br>token: `String`<br> `Params`<br>id: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete one Of cart

## /product GET & POST response
```javascript
//in GET response, you will get array, 
// in POST response, you will get object of new article

/**
 * GET ALL PRODUCT  
 * 
 * */

[
  {
    "_id": //product id,
    "name": //product name,
    "price": //product price,
    "stock": //product stock,
    "image": //product file image from google bucket,
    "details": //product detail,
  },
]
/**
 * CREATE PRODUCT
 * 
 * */
{
    "_id": //product id,
    "name": //product name,
    "price": //product price,
    "stock": //product stock,
    "image": //product file image from google bucket,
    "details": //product detail,
}
/**
 * FIND USER CART
 * 
 * */
[
  {
    "_id": //cart id,
    "user": {
      "_id": //user id,
      "username": //user username,
      "email": //user email
    },
    "product": {
      "_id": //product id,
      "name": //product name,
      "price": //product price,
      "stock": //product stock,
      "image": //product image link from google cloud storage,
    },
    "quantity": //quantity of user add this product to cart,
    "createdAt": //time when user add to cart,
    "updatedAt": //time when user add to cart
  },
]
/**
 * BUY PRODUCT RESPONSE // ARRAY OF PRODUCT WHICH STOCK ALREADY DECREASED
 * 
 * */
[
  {
    "_id": //product id,
    "name": //product name,
    "price": //product price,
    "stock": //new product stock after decreased by the amount of checkout quantity,
    "image": //product image link from google cloud storage,
    "details": //product detail,
  }
]

```

## END 
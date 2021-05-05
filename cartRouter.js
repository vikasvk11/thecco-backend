const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Cart} = require('./cart.model');
const {extend} = require("lodash");

router.route('/')
.get(async (req, res) => {
  const cartProducts = await Cart.find({}).populate("productId");
  res.json({success: true, cartProducts});
})
.post(async (req, res) => {
  try {
  const { productId, quantity } = req.body;

  const NewCartProduct = new Cart({ productId: productId, quantity: quantity });

  // const savedNewCartProduct = await NewCartProduct.save();
  // res.json({success: true, savedNewCartProduct})

  console.log(NewCartProduct);
  res.json({success: true, NewCartProduct})

  } catch(err) {

  res.status(500).json({success: false, message: "failed to add product to cart", errorMessage: err.message});
  }
})

router.param("pId", async (req, res, next, pId) => {
  try {

  const obj = await Cart.findOne({ "productId": pId});

  if(!obj) {
      return res.status(400).json({success: false, message: "no product available with this Id in the cart!"});
    }

  req.product = obj;
  next();
  
} catch(err) {
  res.status(400).json({succes: false, message: "retrieving cart product failed"})
}
})

router.get("/:pId", (req, res) => {
  let {product} = req
  res.json({success: true, product})
})

router.post("/:pId", async(req, res) => {

  const update = req.body;
  let {product} = req;

  product = extend(product, update);
  // product = await product.save();

  res.json({success: true, product});
})

router.delete("/:pId", async(req, res) => {

  let {product} = req;
  // const obj = await Cart.deleteOne({ "productId": product.productId });
  res.json({success: true, message: "deleted successfully"});

})

module.exports = router
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Product} = require('./product.model');
const {extend} = require("lodash");

router.route("/")
.get(async (req, res) => {
  const products = await Product.find({});
  res.json({products, success: true})
})
.post( async (req, res) => {
  try {
  const { name, numberOfProducts } = req.body;

  const NewProduct = new Product({name: name, numberOfProducts: numberOfProducts});

  const savedProduct = await NewProduct.save();

  console.log(savedProduct);

  res.json({savedProduct, success: true});

  } catch(err) {
    res.status(500).json({ success:false, message: "failed to add product", errorMessage: err.message});
  }
  
});

router.param("productId", async(req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);

    if(!product) {
      return res.status(400).json({success: false, message: "no product available with this Id!"});
    }

    req.product = product;

    next();

  } catch (err) {
    res.status(400).json({succes: false, message: "retrieving product failed"})
  }
})


router.get("/:productId", (req, res) => {

  let { product } = req;

  res.json({success: true, product});
});


router.post('/:productId', async (req, res) => {

  const productUpdate = req.body;
  let { product } = req;

  product = extend(product, productUpdate);
  product = await product.save();

  res.json({success: true, product});
});

module.exports = router;
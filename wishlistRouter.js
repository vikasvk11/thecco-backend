const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Wishlist } = require('./wishlist.model');

router.route("/")
.get(async(req, res) => {

  const wishlistProducts = await Wishlist.find({}).populate("_id");

  res.json({success: true, wishlistProducts});
})
.post(async (req, res) => {
  try{
  const { id } = req.body;

  const NewWishlistProduct = new Wishlist({ _id: id })

  // const savedNewWishlistProduct = await NewWishlistProduct.save();
  // res.json({success: true, savedNewWishlistProduct})

  res.json({success: true, NewWishlistProduct})

} catch(err) {
  res.status(500).json({success: false, message: "Saving to wishlist failed!"})
}
})

router.delete("/:pId", async (req, res) => {
  const { pId } = req.params;
  // const obj = await Wishlist.deleteOne({ "_id": pId })
  res.json({success: true, message: "deleted successfully"});
})



module.exports = router;
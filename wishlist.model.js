const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: "Cannot add to cart without a Product ID",
    ref: "Product"
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = { Wishlist };
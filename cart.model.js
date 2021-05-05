const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: "Cannot add to cart without a Product ID",
    ref: "Product"
  },
  quantity: {
    type: Number,
    required: "Cart Product must have a quantity",
    min: [1, "Minimum quantity of a product in cart is one"]
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart };
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String, 
    required: "Cannot enter data without a Product name"
  },
  image: {
    type: String,
    required: "Cannot add product without an image"
  },
  price: {
    type: Number,
    required: "Cannot add product without a price"
  },
  material: {
    type: String
  },
  brand: {
    type: String
  },
  inStock: {
    type: Boolean
  },
  fastDelivery: {
    type: Boolean
  },
  ratings: {
    type: Number,
    min: [1, "Product Ratings cannot be less than 1"],
    max: [5, "Product Ratings cannot be more than 1"]
  },
  offer: {
    type: String
  },
  idealFor: {
    type: String
  },
  level: {
    type: String
  },
  color: {
    type: String
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

const Product = mongoose.model('Product', productsSchema);

module.exports = { Product };
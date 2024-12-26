// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);

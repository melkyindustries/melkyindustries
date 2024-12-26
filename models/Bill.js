// models/Bill.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  gst: { type: Number, required: true },
  discount: { type: Number, required: true },
  sst: { type: Number, required: true },
  cgst: { type: Number, required: true },
  total: { type: Number, required: true },
});

const BillSchema = new mongoose.Schema({
  companyname: { type: String, required: true },
  gstno: { type: String, required: true },
  billingname: { type: String, required: true },
  location: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  products: [ProductSchema], // Array of products
  basicvalue: { type: Number, required: true },
  discountamount: { type: Number, required: true },
  gstamount: { type: Number, required: true },
  grandtotal: { type: Number, required: true },
  billingstatus: { type: Boolean, default: false },
  date: { type: Date, default: Date }, // Add a date field with the current timestamp by default
});

module.exports = mongoose.model('Bill', BillSchema);

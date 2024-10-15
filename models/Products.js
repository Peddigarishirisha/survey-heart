const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true, 
    unique: true
  },
  Product_price: {
    type: Number,
    required: true 
  },
  Product_description: {
    type: String,
    required: true 
  }
});

const product = mongoose.model("Product", ProductSchema);



module.exports = product


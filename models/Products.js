const mongoose = require("mongoose");

// Define the schema
const ProductSchema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true, // Corrected 'require' to 'required'
    unique: true
  },
  Product_price: {
    type: Number,
    required: true // Corrected 'require' to 'required'
  },
  Product_description: {
    type: String,
    required: true // Corrected 'require' to 'required'
  }
});

// Check if the model already exists before compiling
module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);

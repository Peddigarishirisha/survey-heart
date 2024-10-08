const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  agentmail: {
    type: String,
    ref: "Agents",
    required: true,
  },
  leadmail: {
    type: String,
    ref: "Leads", 
    required: true,
  },
  productsSold: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", salesSchema);
const Product = require("../models/Products");
const Agents = require("../models/agents");
<<<<<<< HEAD
const Leads = require("../models/leads"); 
=======
const Leads = require("../models/leads");
const Product = require("../models/Products");  
>>>>>>> 9037f2aae1d48778b26aad5e4ad5ae5d4a66b26f
const Sale = require("../models/sales");

const salesDetails = async (req, res) => {
  try {
    const { agentmail, leadmail, productsSold, saleDate} = req.body;
    // Find the agent by email
    const agent = await Agents.findOne({ email: { $regex: new RegExp(`^${agentmail}$`, "i") } });

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Find the lead by email
    const lead = await Leads.findOne({ Email: leadmail });
    // console.log(email)
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

  productsSold.forEach(async product => {
    const isProductExist = await Product.findById(product.productId);
    console.log(isProductExist)
    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found" });
    }
  });

    // Check if a sale already exists for this lead
    const existingSale = await Sale.findOne({ agentmail, leadmail });
    if (existingSale) {
      return res.status(400).json({ message: "A sale already exists for this lead." });
    }

    // Create new sale
    const sale = new Sale({
      agentmail,
      leadmail,
      productsSold: productsSold,
      saleDate,
    });

    // Save the sale
    await sale.save();

    return res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = salesDetails;
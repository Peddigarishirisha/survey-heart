const Agents = require("../models/agents");
const Leads = require("../models/leads");
const Product = require("../models/products");  
const Sale = require("../models/sales");

const salesDetails = async (req, res) => {
  try {
    const { agentmail, leadmail, productId, saleDate } = req.body;
console.log(agentmail, leadmail, productId, saleDate)
    // Find the agent by email
    const agent = await Agents.findOne({ email: { $regex: new RegExp(`^${agentmail}$`, "i") } });

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Find the lead by email
    const lead = await Leads.findOne({ email: leadmail });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

  
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if a sale already exists for this lead
    const existingSale = await Sale.findOne({ agentmail, leadmail });
    if (existingSale) {
      return res.status(400).json({ message: "A sale already exists for this lead." });
    }

    // Create new sale
    const sale = new Sale({
      agentmail,
      leadmail,
      productsSold: [
        {
          productId: product._id,
          productName: product.name,
          price: product.price,
        },
      ],
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
const Agent = require("../models/agents");
const Lead = require("../models/leads");
const Product = require("../models/products");
const Sale = require("../models/sales");

const salesDetails = async (req, res) => {
  try {
    const { agentmail, leadmail, productId, saleDate } = req.body;
    console.log(agentmail, leadmail, productId, saleDate);

   
    const agent = await Agent.findOne({ email: agentmail });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    
    const lead = await Lead.findOne({ email: leadmail });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

   
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
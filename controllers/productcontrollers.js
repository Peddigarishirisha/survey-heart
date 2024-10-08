const Products = require("../models/Products");

const productcontrollers = async (req, res) => {
  const { Product_name, Product_price, Product_description } = req.body;

  // Ensure required fields are provided
  if (!Product_name || !Product_price || !Product_description) {
    return res
      .status(400)
      .json({ message: "Please provide Product_name, Product_price, and Product_description" });
  }
  try {
    // Check if the product already exists
    const productdetails = await Products.findOne({ Product_name: Product_name });
    if (productdetails) {
      return res.status(409).json({ message: "Product data already exists" });
    }

    // Create new product
    const newproduct = new Products({
      Product_name,
      Product_price,
      Product_description,
    });

    // Save the product
    await newproduct.save();

    res.status(201).json({ message: "Product data successfully added", product: newproduct });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error specifically
      return res.status(409).json({ message: "Duplicate product entry. Product already exists." });
    }

    // Catch any other internal server errors
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = productcontrollers;

const Agents = require("../models/agents");

const createagents = async (req, res) => {
  const { Name, Email, Phonenumber, Customer_id } = req.body;

  // Corrected the logical condition
  if (!Name || !Email || !Phonenumber || !Customer_id) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, phone number, and customer ID" });
  }

  try {
    // Check if agent with the same email already exists
    const agentinformation = await Agents.findOne({ Email: Email });
    if (agentinformation) {
      return res.status(409).json({ message: "Agent data already exists" });
    }

    // Create new agent
    const newAgent = new Agents({
      Name,
      Email,
      Phonenumber, 
     Customer_id, 
    });

    await newAgent.save();

    res.status(201).json({ message: "Agent data successfully added", agent: newAgent });
  } 
  catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createagents;

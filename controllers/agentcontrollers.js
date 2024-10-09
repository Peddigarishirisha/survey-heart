const Agents = require("../models/agents");
const { agentValidationSchema } = require('../models/validations');


const createagents = async (req, res) => {
  try {
    const { name, email, phone, company_id } = req.body;

    // Validate input using Joi
    const { value, error } = agentValidattionSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const formattedErrors = error.details.map(err => ({
        field: err.context.key,
        message: err.message,
      }));

      return res.status(400).send({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    // Check if agent with the same email already exists
    const existedagent = await Agents.findOne({ email: email });
    
    if (existedagent) {
      return res.status(409).json({ message: "Agent already exists" });
    }

    // Create new agent
    const newAgent = new Agents({
      name,
      email,
      phone,
      company_id,
    });

    // Save new agent to the database
    await newAgent.save();

    res.status(201).json({
      message: "Agent created successfully",
      status: "success",
      data: newAgent,
    });

  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

module.exports = createagents;

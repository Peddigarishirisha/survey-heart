const mongoose=require("mongoose")
const agentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Phonenumber: {
    type: Number,
    require: true,
    unique: true,
  },
  Customer_id: {
    type: Number,
    require: true,
    unique: true,
  },
});

module.exports =mongoose.model("Agents",agentSchema)


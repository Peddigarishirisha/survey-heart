const mongoose=require("mongoose")
const leadsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Phone: {
    type: Number,
    require: true,
    unique: true,
  },
  Age: {
    type: Number,
    require: true,

  },
  City:{
    type:String,
    require: true,
  },
  State:{
    type:String,
    require:true,
  },
  Country:{
    type:String,
    require:true,
  },
  Pincode:{
    type:Number,
    require:true,
  },
  Agent_email:{
    type:String,
    reference:"Agent",
    require:true,
}
});
const leads =mongoose.model("leads",leadsSchema)

module.exports =leads
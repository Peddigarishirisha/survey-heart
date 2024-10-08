const mongoose=require("mongoose")
const ProductSchema=new mongoose.Schema({

Product_name:{
    type:String,
    require:true,
    unique:true
},
Product_price:{

    type:Number,
    require:true
},
Product_description:{
    type:String,
    require:true
},

})
module.exports = mongoose.model("Product",ProductSchema)

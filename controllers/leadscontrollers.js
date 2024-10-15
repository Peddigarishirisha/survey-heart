const express=require("express");
const Leads=require("../models/leads")
const Leadcontrollers = async (req,res)=>{
    const {Name,Email,Phonenumber,Age,City,State,Country,Pincode,Agent_email} = req.body;
    if(!Name,!Email,!Phonenumber,!City,!State,!Country,!Pincode,!Agent_email){
        return res.status(404).send("All fields are mandatory")
    }

    try{
        const existagent=await Leads.findOne({Agent_email:Agent_email})
        if(existagent){
            return res.status(201).send("Lead already exists")
        }
        const newLead = new Leads({
            Name,
            Email,
            Phonenumber,
            Age,
            City,
            State,
            Country,
            Pincode,
            Agent_email
        })
        await newLead.save();
        return res.status(201).json({message:"New lead created",lead:newLead})
    }
    catch(err){
        return res.status(404).json({message:"Error in creating a newLead",error:err.message})
    }
}
module.exports=Leadcontrollers;
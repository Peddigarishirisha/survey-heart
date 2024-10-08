

const express=require("express")

const createagent= require("../controllers/agentcontrollers");
const router=express.Router();
router.post("/agent",createagent);

module.exports = router

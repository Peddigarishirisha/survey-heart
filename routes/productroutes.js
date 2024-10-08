const express = require("express");
const productcontrollers = require("../controllers/productcontrollers");




const router=express.Router();
router.post("/product",productcontrollers);

module.exports = router
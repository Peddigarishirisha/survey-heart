const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
app.use(express.json());
const port = 5006;


const createagentscontrollers = require("./controllers/agentcontrollers");
const productcontrollers = require("./controllers/productcontrollers");
const Leadcontrollers = require("./controllers/leadscontrollers");
const salesDetails=require("./controllers/salescontrollers")
const salessummaryController=require("./controllers/salessummarycontrollers")
const uri = "mongodb+srv://shirishapeddigari:shirisha123@surveytaskcluster.sfmq6.mongodb.net/?retryWrites=true&w=majority&appName=surveytaskcluster"

mongoose.connect(uri, {dbName:"salesDB"})
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((err) => {
    console.log("MongoDB not connected", err);
  });


app.post("/product", productcontrollers);
app.post("/agent",createagentscontrollers)
app.post("/lead",Leadcontrollers)
app.post("/sale",salesDetails)



// app.get("/summary/:agent_email",salessummaryController)
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
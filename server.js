const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
app.use(express.json());
const port = 5006;

// Controllers
const createagentscontrollers = require("./controllers/agentcontrollers");
const productcontrollers = require("./controllers/productcontrollers");
const Leadcontrollers = require("./controllers/leadscontrollers");

const uri = "mongodb+srv://shirishapeddigari:shirisha123@surveytaskcluster.sfmq6.mongodb.net/?retryWrites=true&w=majority&appName=surveytaskcluster"
// MongoDB connection
mongoose.connect(uri, {dbName:"salesDB"})
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((err) => {
    console.log("MongoDB not connected", err);
  });

// Routes
app.post("/product", productcontrollers);
app.post("/agent",createagentscontrollers)
app.post("/lead",Leadcontrollers)

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
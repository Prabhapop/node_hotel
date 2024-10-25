const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT= process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Welcome to localhost");
});

// app.get("/idle", (req, res) => {
//   var cus_idle = {
//     name: "rava idle",
//     size: "10 inch to 15",
//     is_sambar: "true",
//     is_chutni: "true",
//   };
//   res.send(cus_idle);
// });

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

// Use the routers
app.use("/person", personRoutes);
app.use("/menuItem", menuItemRoutes);


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

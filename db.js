const mongoose = require("mongoose");

// Define the MOngoDB collection
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

// Set up mongoDB connection
mongoose.connect(mongoURL);
//      {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Get the defaultconnection
// Mongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event Listeners for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;

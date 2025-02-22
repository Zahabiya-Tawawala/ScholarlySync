const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbconnection = require("./db");
const cors = require("cors");
const projectCardRoutes = require("./routes/projectCardRoutes");
// Connect to the database
dbconnection();

// Middleware (for CORS)
app.use(cors());

// Middleware (for parsing JSON)
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Hello, This is Zahabiya's Mini Project");
});

// Project Card routes
app.use("/api", projectCardRoutes);

// Start the server
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
///
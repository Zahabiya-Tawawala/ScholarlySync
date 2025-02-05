const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbconnection = require("./db");

// Connect to the database
dbconnection();

// Middleware (for parsing JSON)
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Hello, This is Zahabiya's Mini Project");
});

// Start the server
const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

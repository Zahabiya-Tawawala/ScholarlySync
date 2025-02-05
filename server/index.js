const express = require("express");
const app = express();
const PORT = 3000;

// Middleware (for parsing JSON)
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Hello, Node.js Backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

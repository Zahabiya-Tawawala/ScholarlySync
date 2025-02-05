const express = require("express");
const app = express();
const PORT = 3000;

// Middleware (for parsing JSON)
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Hello, This is Zahabiya's Mini Project");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

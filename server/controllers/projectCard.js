const dbconnection = require("../db");

// Get all project cards
const getProjectCards = async (req, res) => {
  try {
    const pool = await dbconnection();
    const [rows] = await pool.query("SELECT * FROM projects");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProjectCards };


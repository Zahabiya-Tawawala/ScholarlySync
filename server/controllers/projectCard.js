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

// Create a new project card
const createProjectCard = async(req, res) => {
  try {
    const pool = await dbconnection()
    const {title, description, status} = req.body;
    const [rows] = await pool.query("INSERT INTO projects (title, description, status) VALUES (?, ?, ?)", [title, description, status]);
    res.status(201).json({id: rows.insertId, title, description, status});
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// link submission function 


module.exports = { getProjectCards, createProjectCard };


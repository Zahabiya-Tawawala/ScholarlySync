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
const createProjectCards = async (req, res) => {
  try {
    const pool = await dbconnection();
    const { title, description, status } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO projects (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );
    res.status(201).json({ id: rows.insertId, title, description, status });
  } catch (error) {
    console.error("Error creating project card: ", error);
    res.status(500).json({ error: error.message });
  }
};

// link submission function
const submitGithubAndVideoLink = async (req, res) => {
  try {
    const pool = await dbconnection();
    const { id, github_link, video_link } = req.body;
    const [rows] = await pool.query(
      "UPDATE projects SET github_link = ? , video_link = ? , status = 'completed' WHERE id = ? AND github_link IS NULL AND video_link IS NULL",
      [github_link, video_link, id]
    );

    if (rows.affectedRows === 0) {
      return res
        .status(400)
        .json({ error: "links have already been set or record not found." });
    }
    res.status(200).json({ message: "Project links updated successfully." });
  } catch (error) {
    console.error("Error updating project links: ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProjectCards,
  createProjectCards,
  submitGithubAndVideoLink,
};

const mysql = require("mysql2/promise");

const dbconnection = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,  // Allow the pool to wait for a connection
      connectionLimit: 10,       // Number of simultaneous connections
      queueLimit: 0              // No limit on the connection queue
    });

    console.log(
      `Database connected successfully to ${process.env.DB_NAME} on ${process.env.DB_HOST}`
    );
    return pool; // Return the pool for querying
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);
  }
};

module.exports = dbconnection;    // Export the function for use in other files
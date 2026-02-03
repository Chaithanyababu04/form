const mysql = require("mysql2");

// Create a connection pool (recommended for Cloud Run)
const pool = mysql.createPool({
  host: "127.0.0.1",          // MUST be localhost for Cloud SQL Auth Proxy
  port: 3306,
  user: process.env.DB_USER,  // set in Cloud Run env vars
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,         // keep small for serverless
  queueLimit: 0,
});

// Test connection on startup (does NOT crash app)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ DB connected to Cloud SQL");
    connection.release();
  }
});

module.exports = pool;

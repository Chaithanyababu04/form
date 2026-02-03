const mysql = require("mysql2");

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  // ✅ THIS IS THE FIX
  socketPath: `/cloudsql/project-df670ba1-9bd8-4b7a-8ea:europe-west1:form`,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    return;
  }
  console.log("✅ DB connected to Cloud SQL via socket");
  connection.release();
});

module.exports = pool;

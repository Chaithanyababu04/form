const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "rootpass",
  database: process.env.DB_NAME || "formdb"
});

connection.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL connected");
});

module.exports = connection;

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.status(200).send("✅ Cloud Run app is working");
});

// POST route
app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("DB Error");
      }
      res.send("Data saved successfully!");
    }
  );
});

// ✅ Cloud Run–compatible port
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

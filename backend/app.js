const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Serve index.html on /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ✅ Handle form submission
app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email required");
  }

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) {
        console.error("MYSQL ERROR:", err);
        return res.status(500).send("DB Error");
      }
      // simple success page
      res.send("<h3>Data saved successfully!</h3><a href='/'>Go back</a>");
    }
  );
});

// ✅ Cloud Run compatible port
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

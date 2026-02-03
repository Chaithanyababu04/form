const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ frontend path inside container
const frontendPath = path.join(__dirname, "frontend");

// serve static files
app.use(express.static(frontendPath));

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// handle form submit
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
        console.error(err);
        return res.status(500).send("DB Error");
      }
      res.send("<h3>Saved!</h3><a href='/'>Go back</a>");
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

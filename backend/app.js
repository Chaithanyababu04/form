const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) return res.status(500).send("DB Error");
      res.send("Data saved successfully!");
    }
  );
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

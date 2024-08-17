const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const dataFilePath = path.join(__dirname, "data.json");

app.post("/submit", (req, res) => {
  const { username, lastname, email, phone } = req.body;

  let existingData = [];
  if (fs.existsSync(dataFilePath)) {
    existingData = JSON.parse(fs.readFileSync(dataFilePath));
  }

  existingData.push({ username, lastname, email, phone });

  fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), (err) => {
    if (err) res.json({ massage: "error" });
  });

  res.json({ message: "Data stored successfully!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

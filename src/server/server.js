const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "data", "products.json");

  const data = fs.readFileSync(filePath, "utf-8");
  res.json(JSON.parse(data));
});

const buildPath = path.join(__dirname, "../../build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 App running on http://localhost:${PORT}`);
});

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from public/build (HTML, CSS)
app.use(express.static(path.join(__dirname, "public", "build")));

// Serve JS modules from src/js
app.use("/js", express.static(path.join(__dirname, "src", "js")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Note app running at http://localhost:${PORT}`);
});

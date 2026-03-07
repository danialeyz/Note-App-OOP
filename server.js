const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve all static files from project root
app.use(express.static(__dirname));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Note app running at http://localhost:${PORT}`);
});

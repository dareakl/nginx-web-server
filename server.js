const express = require("express");
const path = require("path");
const app = express();
const PORT = 4002;

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log("Request served by node app");
});

app.listen(PORT, () => {
  console.log(`Node app is running on the port ${PORT}`);
});

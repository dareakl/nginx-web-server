const express = require("express");
const path = require("path");
const app = express();
const PORT = 4002;

const replicaApp = process.env.APP_NAME;

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log(`Request served by ${replicaApp}`);
});

app.listen(PORT, () => {
  console.log(`${replicaApp} is running on the port ${PORT}`);
});

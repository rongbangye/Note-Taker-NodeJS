const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
// Instantiate the server, then tell it to listen for request
const app = express();

// add a route. This can go under the existing routes but above app.listen()
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API Server now on port ${PORT}`);
});

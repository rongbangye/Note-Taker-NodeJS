const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
// Instantiate the server, then tell it to listen for request
const app = express();

app.use(express.static(__dirname + "/public"));

// API GET Requests
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data);
    res.send(dbData);
  });
});

// add a route. This can go under the existing routes but above app.listen()
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`API Server now on port ${PORT}`);
});

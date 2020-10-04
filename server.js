const express = require("express");
const path = require("path");
const fs = require("fs");
const { notes } = require("./db/db");

const PORT = process.env.PORT || 3001;
// Instantiate the server, then tell it to listen for request
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static(__dirname + "/public"));

// API GET Requests
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data);
    res.send(dbData);
  });
});

// API POST Requests
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  fs.readFile("./db/db.json", (error, data) => {
    if (error) throw error;
    dbData = JSON.parse(data);
    dbData.push(newNote);
    let id = 1;
    dbData.forEach(note => {
      note.id = id;
      id++;
      return dbData;
    });

    stringData = JSON.stringify(dbData);

    fs.writeFile("./db/db.json", stringData, (error, data) => {
      if (error) throw error;
    });
  });
  res.send("You created a new note");
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

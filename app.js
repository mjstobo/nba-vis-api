const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./database");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
  });
});

app.post("/team", db.createTeam);
app.post("/players", db.createPlayer);
app.get("/players", db.getAllPlayers);
app.get("/player", db.getPlayer);
app.get("/team", db.getTeam);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

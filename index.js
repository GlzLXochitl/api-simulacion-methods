const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
//const { Sequelize } = require('sequelize'); // Import the sequelize module
const { getUsers, createUser } = require("./queries/user.queries");   //importar getUsers

app.use(bodyParser.json());

app.get("/user", (req, res) => {
  getUsers(req, res);
});

app.post("/user", (req, res) => {
  createUser(req, res);
});

app.listen(port, () => {
  console.log(` app running on port ${port}`);
});
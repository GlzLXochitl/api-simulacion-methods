const db = require("../db.js");    //importar el objeto db

const User = db.users;    //acceso al modelo de usuarios User en representacion  //unicamente la tabla de usuarios   //importar user

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);     //genera un json y lomanda como respuesta de lo que haya traido de users
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
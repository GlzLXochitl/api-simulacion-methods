const { Sequelize } = require('sequelize'); // Import the sequelize module

const sequelize = new Sequelize("books-bd", "root", "", {   //CONECCION A LA BACE DE DATOS
    host: "localhost", //
    dialect: "mariadb" //
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();

const db = {};  //bolsita basia

//meter los modelos en la bolsita

db.sequelize = sequelize;  //acceso a la libreria
db.sequelize = Sequelize;  //acceso a la instancia

db.books= require('./models/book.model.js')(sequelize, Sequelize);  //modelo de usuarios

module.exports = db; //exportar el objeto db   //module es una bolsita jsjs aqui ponemos a disposicion la bolsita
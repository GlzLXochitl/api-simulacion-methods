const express = require("express"); //Importa los módulos necesarios para crear el servidor
const app = express();   //crear el servidor
const port = 3000;  //puerto
const bodyParser = require("body-parser");  //para analizar el cuerpo de las solicitudes HTTP entrantes
//const { Sequelize } = require('sequelize'); // Import the sequelize module

require('dotenv').config(); //importar dotenv para las variables de entorno

const { auth, requiresAuth } = require('express-openid-connect'); //*** autenticacion con auth0 */

const { 
  getBooks,
  postBook,
  putBook,
  patchBook,
  deleteBook
} = require("./queries/book.queries");   //importar getUsers   

/** */
app.use(bodyParser.json());

const config = {     //ESTO VA EN EL .env como variables de entorno para protejerlos ya que son datos sencibles y despues el .env se ponra en el .gitignore
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL, //'http://localhost:3000',
  clientID: process.env.CLIENT_ID, //'tnVc3s91JrqO0ubHZhpG7TRRxnLSTQu3',
  issuerBaseURL: process.env.ISSUER_BASE_URL, //'https://dev-yvdbg2fub3cj1iiv.us.auth0.com',
  secret: process.env.SECRET //'LONG_RANDOM_STRING'
};

console.log(process.env); //imprime las variables de entorno o ambiente

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});
/** */


app.get("/books", requiresAuth(), (req, res) => {   //añadir requiresAuth() para aplicar la autenticasion de auth0
  getBooks(req, res);
});

app.post("/books", (req, res) => {
  postBook(req, res);
});

app.put("/books/:id", (req, res) => {
  putBook(req, res);
});

app.patch("/books/:id", (req, res) => {
  patchBook(req, res);
});

app.delete("/books/:id", (req, res) => {
  deleteBook(req, res);
});



app.listen(port, () => {
  console.log(` app running on port ${port}`);
});
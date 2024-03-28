const db = require("../db.js");    //importar el objeto db

const Book = db.books;    //acceso al modelo de usuarios User en representacion  //unicamente la tabla de usuarios   //importar user

// Obtener todos los libros
const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ status: 200, data: books });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Crear un nuevo libro
const postBook = async (req, res) => {
  try {
    // Verificar si todos los campos necesarios están presentes
    const requiredFields = ['title', 'author', 'isbn']; // Añade aquí todos los campos necesarios
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ status: 400, message: `Missing fields` });
      }
    }

    // Buscar si el libro ya existe
    const existingBook = await Book.findOne({ where: { isbn: req.body.isbn } });
    if (existingBook) {
      return res.status(409).json({ status: 409, message: 'Book with this ISBN already exists' });
    }

    // Crear el nuevo libro
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);  //*
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

// Actualizar un libro existente
const putBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const [updatedRows] = await Book.update(req.body, {
      where: { id: bookId }
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar parcialmente un libro existente
const patchBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const [updatedRows] = await Book.update(req.body, {
      where: { id: bookId }
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro actualizado parcialmente correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un libro existente
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedRows = await Book.destroy({
      where: { id: bookId }
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  postBook,
  putBook,
  patchBook,
  deleteBook
};
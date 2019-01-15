const express = require('express');
const BookController = require('../../domain/controllers/BookController');

const routes  = function() {

  const bookRouter = express.Router();
  
  async function index(req, res) { 
     const data = await BookController().getBooks();
     res.json(data);
  }

  async function getBookById(req, res) {
    const idx = req.params.id
    const book = await BookController().getBookById(idx);
    res.json(book);
  }

  async function newBook(req, res) {
    const newBook = await BookController().createBook(req.body);
    res.json(newBook);
  }

  async function updateBook(req, res) {
    const updateBook = await BookController().updateBook(req.params.id, req.body);
    res.json(updateBook);
  }

  async function deleteBook(req, res) {
    const book = await BookController().deleteBook(req.params.id);
    res.json(book);
  }
  
  async function patchUpdateBook(req, res) {
    const updateBook = await BookController().patchUpdateBook(req.params.id, req.body);
    res.json(updateBook);

  }

  
  function addRoutes() {
    bookRouter.get('/books', index);
    bookRouter.get('/books/:id', getBookById);
    bookRouter.put('/books/:id', updateBook);
    bookRouter.delete('/books/:id', deleteBook);
    bookRouter.patch('/books/:id', patchUpdateBook);
    bookRouter.post('/books', newBook);
    return bookRouter;
  }

  return addRoutes();
  
}

module.exports = routes;
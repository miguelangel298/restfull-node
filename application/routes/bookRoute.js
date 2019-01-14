const express = require('express');
const Book = require('../../data/models/BookModel');
const BookController = require('../../domain/controllers/BookController');


const routes  = function() {

const bookRouter = express.Router();


  // bookRouter.route('/books')
  //   .post(BookController().createBook)
  //   .get(BookController().getBooks);

  bookRouter.use('/books/:id', function(req,res,next){
    Book.findById(req.params.id, function(err,book){
      if(err)
        res.status(500).send(err);
      else if(book){
        req.book = book;
        next();
      } else {
        res.status(404).send('not book found');
      }
    })
  });
  // bookRouter.route('/books/:id')
  // .get(BookController().getBookById)
  // .put(BookController().updateBook)
  // .patch(BookController().patchUpdateBook)
  // .delete(BookController().deleteBook);


  
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
  
  function addRoutes() {
    bookRouter.get('/books', index);
    bookRouter.get('/books/:id', getBookById);
    bookRouter.put('/books/:id', updateBook);
    bookRouter.post('/books', newBook);
    return bookRouter;
  }

  return addRoutes();
  
}

module.exports = routes;
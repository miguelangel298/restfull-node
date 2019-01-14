const express = require('express');
const Book = require('../../data/models/BookModel');
const BookController = require('../../domain/controllers/BookController');


const routes  = function() {

const bookRouter = express.Router();
  bookRouter.route('/books')
    .post(BookController().createBook)
    .get(BookController().getBooks);

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
  bookRouter.route('/books/:id')
  .get(BookController().getBookById)
  .put(BookController().updateBook)
  .patch(BookController().patchUpdateBook)
  .delete(BookController().deleteBook);

  return bookRouter;
}

module.exports = routes;
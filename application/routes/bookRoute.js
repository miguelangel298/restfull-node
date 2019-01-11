const express = require('express');
const Book = require('../../data/models/BookModel');
const routes = function() {

const bookRouter = express.Router();
  bookRouter.route('/books')
    .post(function(req, res) {
      const book = new Book(req.body);
      book.save().then(function () {
        res.status(201).send(book);
      });
    })
    .get(function(req, res) {
      console.log('se ejecuto');
      Book.find({}, function(err, books) {
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      })
    });
  
  bookRouter.route('/books/:id')
  .get(function(req, res){
    Book.findById(req.params.id, function(err, book){
      if(err)
        res.status(500).send(err);
      else
        res.json(book);
    });
  });

  return bookRouter;
}

module.exports = routes;
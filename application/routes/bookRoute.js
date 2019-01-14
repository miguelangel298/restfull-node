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
      Book.find({}, function(err, books) {
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      })
    });
  
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
  .get(function(req, res){ 
    res.json(req.book);
  })
  .put(function(req, res) {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save();
    res.json(book);
  })
  .patch(function(req, res) {
    if(req.body._id){
      delete req.body._id;
    }

    for(let p in req.body) {
      req.book[p] = req.body[p];
    }

    req.book.save(function(err) {
      if(err)
        res.status(500).send(err);
      else {
        res.json(req.book);
      }
    });
  })
  .delete(function(req, res){
    req.book.remove(function(err) {
      if(err)
        res.status(500).send(err);
      else
        res.status(204).send('Removed') ;
    })
  })
  return bookRouter;
}

module.exports = routes;
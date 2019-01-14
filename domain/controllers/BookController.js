const Book = require('../../data/models/BookModel');

const bookController = function() {

  const createBook = (req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  }

  const getBooks = (req, res) => {
    Book.find({}, function(err,books){
      if(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  }

  const getBookById = (req, res) => {
    res.json(req.book);
  }

  const updateBook = (req, res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save();
    res.json(req.book);
  }

  const patchUpdateBook = (req, res) => {
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
  }

  const deleteBook = (req, res) => {
    req.book.remove(function(err) {
      if(err)
        res.status(500).send(err);
      else
        res.status(204).send('Removed') ;
    })
  }

  return {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    patchUpdateBook
  }

}

module.exports = bookController;


const Book = require('../../data/models/BookModel');

const bookController = function() {
  
  const getBooks = () => {
    return Book.find({}).then(book => {
      return book;
    });
  }

  const createBook = (payload) => {
    const book = new Book(payload);
    return book.save();
  }


  const getBookById = (bookId) => {
    return Book.findById(bookId).then(book => {
      return book
    });
  }

  async function updateBook (idx,payload) {
    const book = await getBookById(idx);
    book.title = payload.title;
    book.author = payload.author;
    book.genre = payload.genre;
    book.read = payload.read;
    return book.save();
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


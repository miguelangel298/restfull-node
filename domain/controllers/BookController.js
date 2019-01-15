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

  async function patchUpdateBook(idx,payload){
    if(payload._id){
      delete payload._id;
    }
    const book = await getBookById(idx);
    for(let p in payload) {
      book[p] = payload[p];
    }
    book.save(function(err) {
      if(err)
        return err;
      else {
        return book;
      }
    });
    return book;
  }

  async function deleteBook(bookId) {
    const book = await getBookById(bookId);
    book.remove(function(err) {
      if(err)
        return err
      else
       return;
    });
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


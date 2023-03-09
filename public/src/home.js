const {findAuthorById} = require('./books')

function helperJoinFirstAndLastNames(author) {
  return `${author.name.first} ${author.name.last}`;
}

function getTotalBooksCount(books) {
  return (books.length > 0 ? books.length : 0)
}

function getTotalAccountsCount(accounts) {
  return (accounts.length > 0 ? accounts.length : 0)
}

function getBooksBorrowedCount(books) {
  // for all books, into borrows, count the first index that comes back false
  let booksCheckedOut = 0;
  books.forEach((bookObj)=>{
    const {borrows} = bookObj;
    borrows.forEach((borrowsObject)=>{
      if (borrowsObject.returned === false) {
        booksCheckedOut++;
        return;
      }
  })
})
  return booksCheckedOut;
}

function getMostCommonGenres(books) {
  const trackerObj = {};
  books.forEach((bookObj)=>{
    if (trackerObj[bookObj.genre] === undefined) {
      trackerObj[bookObj.genre] = 1;
    } else {
      trackerObj[bookObj.genre] += 1;
    }
  })

  const result = [];
  for (let genreKey in trackerObj) {
    let info = {name: genreKey, count: trackerObj[genreKey]};
    result.push(info);
  } 

  result.sort((genreA, genreB)=>{
    return genreB.count - genreA.count;
  }) 
  return result.slice(0,5);
}

function getMostPopularBooksHelper(books) {
  books.sort((bookA, bookB)=>{
    return bookB.borrows.length - bookA.borrows.length;
  })
  return books;
}

function getMostPopularBooks(books) {
  books = getMostPopularBooksHelper(books);
    const topBookPicks = books.slice(0,5);
    const result = topBookPicks.map((bookObj)=>{
      return {
        name: bookObj.title,
        count: bookObj.borrows.length
      }
    })
    return result;
}

function getMostPopularAuthors(books, authors) {
  books = getMostPopularBooksHelper(books).slice(0,5);
  const result = [];
  books.forEach((bookObj)=>{
    const author = findAuthorById(authors, bookObj.authorId)
    const info = {
      name: helperJoinFirstAndLastNames(author),
      count: bookObj.borrows.length
    }
     result.push(info)
  })
    return result;
}
                                       



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

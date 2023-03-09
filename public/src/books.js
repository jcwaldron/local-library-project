function findAuthorById(authors, id) {
  return authors.find(authorObj => authorObj.id === id );
}

function findBookById(books, id) {
  return books.find(bookObj => bookObj.id === id );
}


function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((bookObj)=>{
    return bookObj.borrows[0].returned === false;
  });
  const returned = books.filter((bookObj)=>{
    return bookObj.borrows[0].returned === true;
  });
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) { 
  const borrowHistory = book.borrows.map((borrow)=>{ 
   const foundAccount = accounts.find((account)=>{ 
     return account.id === borrow.id; 
   })
   return { 
     name: foundAccount.name, 
     email: foundAccount.email,
     returned: borrow.returned,
   }
 })
 return borrowHistory.slice(0,10); 
 }


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};



const {findAuthorById} = require('./books')


function findAccountById(accounts, id) {
  return accounts.find(accountObj => accountObj.id === id );
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((studentA, studentB)=>{
    return studentA.name.last.toLowerCase() < studentB.name.last.toLowerCase() ? -1 : 1;
  })
}

function getTotalNumberOfBorrows(account, books) {
  const borrowCount = books.reduce((acc, book) => {
    const count = book.borrows.filter(borrow => borrow.id === account.id).length;
    return acc + count;
  }, 0);
  return borrowCount;
}


function getBooksPossessedByAccount(account, books, authors) {
  const {id:accountId} = account;
  const result = books.filter((bookObj)=>{

      const {borrows} = bookObj;
      const found = borrows.some((borrowInstance)=>{
          return borrowInstance.id === accountId && !borrowInstance.returned;
      })

      if(found === true){
          const foundAuthor = findAuthorById(authors, bookObj.authorId);
          bookObj.author = foundAuthor;   
          return true;         
      } 
      return false;
  });
  return result;
}


  

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

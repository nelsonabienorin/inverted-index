

const invertedClassObj = new InvertedIndex();
const correctBook = require('../book.json');
const wrongBook = require('../wrongFormat.json');
const emptyBook = require('../emptyBook.json');

describe('Read book data', () => {
  it('Should return false for invalid data type', () => {
    expect(invertedClassObj.createIndex(emptyBook[0], 6).toEqual(false));
  });

  it('Should return true for valid data type', () => {
    expect(invertedIndex.createIndex([] ,'books.json').toEqual(true));
  });

   it('Should return false for wrong key json file', () => {
    expect(invertedIndex.createIndex(wrongBook)[0]).toEqual(false);
   });
});

describe('Populate Index',() => {
  it('Should create index once JSON file has been read', () => {
    expect(invertedIndex.createIndex(correctBook)[0]).toEqual(true);
  });

  it('Should ensure index is correct', () => {
     expect(invertedIndex.createIndex(correctBook)[1]).toEqual(true);
  });
});

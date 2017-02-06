const correctBook = require('../books.json');
const emptyBook = require('../emptyBook.json');
console.log('am here @ test');
const invertedobj = new InvertedIndex();
const bookIndex = invertedobj.createIndex('correctBook.json', correctBook);


describe('Read book data', () => {
  describe('Read book data', () => {
    it('should return true if book is empty', () => {
      expect(invertedobj.isJsonEmpty([])).toBeTruthy();
    });
    it('Should return false if book is not empty', () => {
      expect(invertedobj.isJsonEmpty(correctBook)).toBeFalsy();
    });
    it('Should return false if book has empty key and value', () => {
      expect(invertedobj.createIndex('emptyBook.json', emptyBook)).toBeFalsy();
    });
  });

  describe('Populate Index', () => {
    it('should read the book and make sure it is an instance of an object', () => {
      expect(typeof invertedobj.createIndex('correctBook.json', correctBook)).toEqual('object');
    });

    it('Should ensure index is correct', () => {
      expect(bookIndex.alice).toEqual({
        0: true
      });
    });
  });

  describe('Search Index', () => {
    it('Should return an array of the indices of the correct objects that contain the words in the search query', () => {
      expect(invertedobj.searchIndex('alice', 'correctBook.json')).toEqual({
        alice: {
          0: true
        }
      });
    });
  });
});

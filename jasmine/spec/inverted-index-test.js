const correctBook = require('../books.json');

const emptyBook = require('../emptyBook.json');

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
    it(`should read the book and make sure
     it is an instance of an object`, () => {
      expect(typeof invertedobj
        .createIndex('correctBook.json', correctBook)).toEqual('object');
    });

    it('Should ensure index is correct', () => {
      expect(bookIndex.alice).toEqual({
        0: true
      });
    });
  });

  describe('Search Index', () => {
    it(`Should return an object of the indices of
     the correct objects that contain the words in the search query`, () => {
      expect(invertedobj.searchIndex('alice', 'correctBook.json')).toEqual({
        alice: {
          0: true
        }
      });
    });

    it(`Should return the correct search index for all files when
    searching for 'alice and'`, () => {
      expect(invertedobj.searchIndex('alice and', 'all')).toEqual({
        'correctBook.json': {
          alice: {
            0: true
          },
          and: {
            0: true,
            1: true
          }
        }
      });
    });

    it(`Should return an object of false value indexes of
     words in the search query that are not found in a file`, () => {
      expect(invertedobj.searchIndex('esther', 'correctBook.json')).toEqual({
        esther: {
          0: false,
          0: false
        }
      });
    });

    it(`Should return an object of false value indexes of words
    in the search query that doesnot exist in all the files
    searching for 'freeman armanda'`, () => {
      expect(invertedobj.searchIndex('freeman armanda', 'all')).toEqual({
        'correctBook.json': {
          freeman: {
            0: false,
            0: false
          },
          armanda: {
            0: false,
            0: false
          }
        }
      });
    });
  });
});

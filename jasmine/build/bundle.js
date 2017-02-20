(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    " ": " ",
    " ": " "
  },

  {
    " ": "",
    " ": " "
  }
]

},{}],3:[function(require,module,exports){
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
    it(`Should return an array of the indices of
     the correct objects that contain the words in the search query`, () => {
      expect(invertedobj.searchIndex('alice', 'correctBook.json')).toEqual({
        alice: {
          0: true
        }
      });
    });
  });
});

},{"../books.json":1,"../emptyBook.json":2}]},{},[3])
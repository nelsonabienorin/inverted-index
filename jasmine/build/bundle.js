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
/* eslint-disable no-unused-vars*/
/* eslint-disable no-undef*/
/* eslint-disable no-dupe-keys*/
/* eslint-disable no-multi-assign*/
const correctBook = require('../books.json');

const emptyBook = require('../emptyBook.json');

const wrongFormatBook = require('../wrongFormat.json');

const invertedobj = new InvertedIndex();

const bookIndex = invertedobj.createIndex('correctBook.json', correctBook);

describe('Read book data', () => {
  describe('Read book data', () => {
    it('should return true if book is empty', () => {
      expect(InvertedIndex.isJsonEmpty([])).toBeTruthy();
    });
    it('Should return false if book is not empty', () => {
      expect(InvertedIndex.isJsonEmpty(correctBook)).toBeFalsy();
    });
    it('Should return false if book has empty key and value', () => {
      expect(invertedobj.createIndex('emptyBook.json',
      emptyBook)).toEqual(false);
    });
    it('Should return false if book has invalid key and value', () => {
      expect(invertedobj.createIndex('wrongFormat.json',
        wrongFormatBook)).toEqual(false);
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

  describe('Get Index', () => {
    it(`Should verify that the correct object
      returned is not null`, () => {
      expect(invertedobj.getIndex('correctBook.json')).not.toBe(null);
    });

    it(`Should verify that the type of the correct object
      returned and is not an object array`, () => {
      expect(!Array.isArray(invertedobj.getIndex('correctBook.json')
      )).toBeTruthy();
    });

    it('Should return  an object upon reading a json filename', () => {
      expect(typeof invertedobj.getIndex('correctBook.json')).toEqual('object');
    });

    it('Should return correct index when alice key is pass', () => {
      expect(invertedobj.getIndex('correctBook.json').alice).toEqual({
        0: true
      });
    });

    it('Should return correct index when passing and', () => {
      expect(invertedobj.getIndex('correctBook.json').and).toEqual({
        0: true,
        1: true
      });
    });
  });
});

},{"../books.json":1,"../emptyBook.json":2,"../wrongFormat.json":4}],4:[function(require,module,exports){
module.exports=
[
  {  "name" : "Alice in Wonderland",
    "value": "Alice falls into a rabbit hole and enters a world full of imagination."
  }
,
   { "name": "The Lord of the Rings: The Fellowship of the Ring.",
    "value": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."

   }
]
},{}]},{},[3])
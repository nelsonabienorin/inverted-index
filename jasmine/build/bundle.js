(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[]
},{}],2:[function(require,module,exports){

// const invertedClassObj = new InvertedIndex();
// describe('Test suite for Inverted Index', () => {
//   describe('Input parameters', () => {
//    it('must be of type object and string', () => {
//      expect(2 + 2).toEqual(4);
//    });
//  });
// });

const invertedClassObj = new InvertedIndex();
// const correctBook = require('../book.json');
// const wrongBook = require('../wrongFormat.json');
const emptyBook = require('../emptyBook.json');

describe('Read book data', () => {
  it('Should return false for empty JSON Array', () => {
    expect(invertedClassObj.createIndex(emptyBook[0], 6).toEqual(false));
  });

  it('Should return true for valid JSON Array', () => {
    expect(invertedIndex.validateFile(correctBook)[0].toEqual(true));
  });

  it('Should return false for wrong key json file', () => {
    expect(invertedIndex.validateFile(invalidBook)[0]).toEqual(false);
  });
});

describe('Populate Index',() => {
  it('Should create index once JSON file has been read', () => {
    expect().toEqual();
  });

  it('Should ensure index is correct', () => {
    expect().toEqual();
  });
});

},{"../emptyBook.json":1}]},{},[2])
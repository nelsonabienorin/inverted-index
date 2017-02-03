(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const invertedClassObj1 = new InvertedIndex();
const appObj1 = new App();
console.log(appObj1);
// const correctBook = require('../books.json');
const wrongBook = require('../wrongFormat.json');
// const emptyBook = require('../emptyBook.json');
// const uploadedFile= document.getElementById('files_id').files[0];
// console.log(invertedClassObj1.myTest);

// describe('Inverted Index Class', () => {
//   it('Should be an instance of a class', () => {
//     expect(invertedClassObj1 instanceof InvertedIndex).toBe(true);
//     expect(invertedClassObj1 instanceof Object).toBe(true);
//     expect(typeof invertedClassObj1).toBe('object');
//   });
// });

describe('Read book data', () => {
  it('should return false for invalid JSON file', () => {
    expect(appObj1.validateFile(wrongBook).toEqual(false));
  });
  // it('Should return false for an invalid JSON array with invalid key', () => {
  //   expect(appObj.validateFile(wrongBook).toEqual(false));
  // });
  // it('Should return false for an invalid json file with empty keys and values', () => {
  //   expect(appObj.validateFile(wrongBook).toEqual(false));
  // });
  // it('Should return true for valid JSON array', () => {
  //   expect(appObj.validateFile(correctBook).toEqual(true));
  // });

  // it('Should return false for wrong key in JSON array', () => {
  //   expect(appObj.validateFile(wrongBook).toEqual(false));
  // });
});

// describe('Populate Index', () => {
//   it('Should create index once JSON file has been read', () => {
//     expect(invertedIndex.createIndex(correctBook)[0]).toEqual(true);
//   });

//   it('Should ensure index is correct', () => {
//     expect(invertedIndex.createIndex(correctBook)[1]).toEqual(true);
//   });
// });


// describe('Search Index', () => {
//   it('should have searchIndex method accessible in the class', () => {
//     expect(invertedIndex.searchIndex).toBeDefined();
//   });

//   it('Should return the correct results when searched', () => {
//     expect(invertedIndex.createIndex(correctBook)[0]).toEqual(true);
//   });

//   it('Should handle an array of search terms', () => {
//     expect(invertedIndex.createIndex(correctBook)[1]).toEqual(true);
//   });

//   it('Should handle a varied number of search terms as arguments', () => {
//     expect(invertedIndex.createIndex(correctBook)[1]).toEqual(true);
//   });

//   it('Should Ensure searchIndex goes through all indexed files if a filename is not passed', () => {
//     expect(invertedIndex.createIndex(correctBook)[1]).toEqual(true);
//   });
// });
},{"../wrongFormat.json":2}],2:[function(require,module,exports){
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
},{}]},{},[1])
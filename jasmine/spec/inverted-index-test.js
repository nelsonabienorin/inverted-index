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
      expect(Helper.isDocEmpty([])).toBeTruthy();
    });

    it('Should return false if book is not empty', () => {
      expect(Helper.isDocEmpty(correctBook)).toBeFalsy();
    });

    it('Should return false if book has invalid key and value', () => {
      expect(Helper.validate(
        wrongFormatBook)).toEqual(false);
    });

    it(`Should return array of words that does not
      have special characters`, () => {
      expect(Helper.removeSpecialXters(`Comment: Eze goes to school
      (everyday, weekly).`)).toEqual(['comment', 'eze', 'goes', 'to',
        'school', 'everyday', 'weekly'
      ]);
    });

    it(`Should remove duplicates and return an
      array of unique words`, () => {
      expect(Helper.removeDuplicateWords(['And', 'Eze', 'goes', 'to',
        'Eze', 'Intl', 'school', 'of', 'music', 'of', 'Nigeria'
      ])).toEqual(['And', 'Eze', 'goes', 'to',
        'Intl', 'school', 'of', 'music', 'Nigeria'
      ]);
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
      expect(!Array.isArray(invertedobj.getIndex('correctBook.json'))).toBeTruthy();
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

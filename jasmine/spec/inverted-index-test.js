/* eslint-disable no-unused-vars*/
/* eslint-disable no-undef*/
/* eslint-disable no-dupe-keys*/
/* eslint-disable no-multi-assign*/
/* eslint-disable import/no-unresolved*/

const correctBook = require('../books.json');

const wrongFormatBook = require('../wrongFormat.json');

const invertedInstance = new InvertedIndex();

const bookIndex = invertedInstance.createIndex('correctBook.json', correctBook);

describe('Read book data', () => {
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
    expect(Helper.removeMultiWordsAndMakeArray(['And', 'Eze', 'goes', 'to',
      'Eze', 'Intl', 'school', 'of', 'music', 'of', 'Nigeria'
    ])).toEqual(['And', 'Eze', 'goes', 'to',
      'Intl', 'school', 'of', 'music', 'Nigeria'
    ]);
  });

  it('Should return false if book has empty key and value', () => {
    expect(invertedInstance.createIndex('wrongFormatBook.json',
      wrongFormatBook)).toEqual(false);
  });

  it('Should return false if book has invalid key and value', () => {
    expect(invertedInstance.createIndex('wrongFormat.json',
      wrongFormatBook)).toEqual(false);
  });
});

describe('Populate Index', () => {
  it(`should read the book and make sure
     it is an instance of an object`, () => {
    expect(typeof invertedInstance
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
     the correct objects that contain the words in
     the search query`, () => {
    expect(invertedInstance.searchIndex('alice', 'correctBook.json')
    ).toEqual({
      alice: {
        0: true
      }
    });
  });

  it(`Should return the correct search index for all files when
    searching for 'alice and'`, () => {
    expect(invertedInstance.searchIndex('alice and', 'all')).toEqual({
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

  it(`Should return the correct indexes for a single file when
    index is been created`, () => {
    expect(invertedInstance.getIndex('correctBook.json')).toEqual({
      alice: {
        0: true
      },
      falls: {
        0: true
      },
      into: {
        0: true
      },
      a: {
        0: true,
        1: true
      },
      rabbit: {
        0: true
      },
      hole: {
        0: true
      },
      and: {
        0: true,
        1: true
      },
      enters: {
        0: true
      },
      world: {
        0: true
      },
      full: {
        0: true
      },
      of: {
        0: true,
        1: true
      },
      imagination: {
        0: true
      },
      an: {
        1: true
      },
      unusual: {
        1: true
      },
      alliance: {
        1: true
      },
      man: {
        1: true
      },
      elf: {
        1: true
      },
      dwarf: {
        1: true
      },
      wizard: {
        1: true
      },
      hobbit: {
        1: true
      },
      seek: {
        1: true
      },
      to: {
        1: true
      },
      destroy: {
        1: true
      },
      powerful: {
        1: true
      },
      ring: {
        1: true
      }
    });
  });

  it(`Should return an object of false value indexes of
     words in the search query that are not found in a file`, () => {
    expect(invertedInstance.searchIndex('esther', 'correctBook.json')
    ).toEqual({
      esther: {
        0: false
      }
    });
  });

  it(`Should return an object of false value indexes of words
    in the search query that doesnot exist in all the files
    searching for 'freeman armanda'`, () => {
    expect(invertedInstance.searchIndex('freeman armanda', 'all')).toEqual({
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
    expect(invertedInstance.getIndex('correctBook.json')).not.toBe(null);
  });

  it('Should return  an object upon reading a json filename', () => {
    expect(typeof invertedInstance.getIndex('correctBook.json')
    ).toEqual('object');
  });

  it(`Should verify that the type of the correct object
      returned and is not an object array`, () => {
    expect(!Array.isArray(invertedInstance.getIndex('correctBook.json')
    )).toBeTruthy();
  });

  it('Should return correct index when alice key is pass', () => {
    expect(invertedInstance.getIndex('correctBook.json').alice).toEqual({
      0: true
    });
  });

  it('Should return correct index when passing and', () => {
    expect(invertedInstance.getIndex('correctBook.json').and).toEqual({
      0: true,
      1: true
    });
  });
});

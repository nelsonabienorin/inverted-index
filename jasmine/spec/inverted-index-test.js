
const correctBook = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];
const emptyBook= [
  {
    " ": " ",
    " ": " "
  },

  {
    " ": "",
    " ": " "
  }
];
const json2 = [
  {
    "title": "Nelson in Auckland",
    "text": "Debby picks up the coconut from the ,top of the chair"
  },

  {
    "title": "A trip to Mallaise Island",
    "text": "So many dangerous animals were found on the way like snakes; mamba type"
  }
];
describe('Read book data', () => {
const emptyArray = [];
const invertedobj = new InvertedIndex();
const bookIndex = invertedobj.createIndex('correctBook.json', correctBook);

describe('Read book data', () => {
  it('should return true if book is empty', () => {
    expect(invertedobj.isJsonEmpty(emptyArray)).toBeTruthy();
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
    expect(bookIndex.alice).toEqual({ 0: true });
  });
});

describe('Search Index', () => {
  it('Should return an array of the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedobj.searchIndex('alice', 'correctBook.json')).toEqual({ alice: { 0: true } });
  });
});
});

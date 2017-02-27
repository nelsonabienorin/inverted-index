/* eslint-disable no-unused-vars*/
/* eslint-disable no-multi-assign*/
/**
 * Inverted Index Class
 * @class
 */
class InvertedIndex {

  /**
   * class constructor
   * For Data Initialization
   * @constructor
   * @returns {undefined}
   */
  constructor() {
    this.allFiles = {};
    this.indexedFiles = {};
    this.ifKeyExist = '';
  }

  /**
   * validate
   * This checks if a json object has title and text key
   * @param {Object} json
   * @returns {undefined}
   */
  validate(json) {
    json.forEach((item) => {
      if (item.title && item.text) {
        this.ifKeyExist = 'true';
      } else {
        this.ifKeyExist = 'false';
      }
    });
    return this.ifKeyExist;
  }

  /**
   * populateIndex
   * Populates the indexes and values of the words by
   * removing special characters, duplicates and arrange index
   * @param {String} fileName
   * @param {Object} fileContent
   * @returns {undefined}
   */
  populateIndex(fileName, fileContent) {
    const uniqueWords = [];
    fileContent.forEach((obj) => {
      if (obj.title && obj.text) {
        // objTitle and objText are arrays of page title and text
        const objTitle = InvertedIndex.removeSpecialXters(obj.title);
        const objText = InvertedIndex.removeSpecialXters(obj.text);
        uniqueWords.push(InvertedIndex.removeDuplicateWords(objTitle, objText));
      }
    });
    // uniqueWords is an array of each pages each
    // having an array of uniqueWords
    uniqueWords.forEach((singlePage, position) => {
      this.arrangeIndex(singlePage, position);
    });
  }

  /**
   * createIndex
   * creates the index for a particular file
   * @param {String}  fileName
   * @param {Object}  fileContents
   * @return {Object} this.allFiles[fileName]
   */
  createIndex(fileName, fileContents) {
    const validateJson = this.validate(fileContents);
    if (validateJson === 'true') {
      this.populateIndex(fileName, fileContents);
    } else {
      return false;
    }
    this.allFiles[fileName] = this.indexedFiles;
    this.indexedFiles = {};
    return this.allFiles[fileName];
  }

  /**
   * getIndex
   * Returns the created indexes for a particular file
   * @param   {String} fileName
   * @returns {Object} allFiles
   */
  getIndex(fileName) {
    return this.allFiles[fileName];
  }

  /**
   * removeSpecialXters
   * Searches through all words in object and remove special characters
   * @param   {Object} obj
   * @returns {Object} returns words void of special characters
   */
  static removeSpecialXters(obj) {
    return obj.toLowerCase().match(/\w+/g);
  }

  /**
   * removeDuplicateWords
   * Removes multiple occurence of words
   * @param   {Object} objTitle Object containing page title
   * @param   {Object} objText Object containing page text
   * @returns {Object} A unique set of words from the page title and text
   */
  static removeDuplicateWords(objTitle, objText) {
    return [...new Set([...objTitle, ...objText])];
  }

  /**
   * arrangeIndex
   * Arranges and sets the position of each word
   * @param {Object} singlePage An object that have page title and text
   * @param {number} position The position of where a word is located
   * @return {Void} Does not return result to other function
   */
  arrangeIndex(singlePage, position) {
    // this.indexedFiles[word] can be of Object form {0: true} or {1: true}
    // !this.indexedFiles[word][position] is expected to be boolean true for
    // word found in a new location
    singlePage.forEach((word) => {
      if (this.indexedFiles[word] && !this.indexedFiles[word][position]) {
        // word is old and is occurring in another page/document position > 0
        this.indexedFiles[word][position] = true;
      } else {
        // word is new i.e. word occurs for the first time
        const oneIndex = {};
        oneIndex[position] = true;
        this.indexedFiles[word] = oneIndex;
      }
    });
  }

  /**
   * searchIndex
   * Searches for a string in indexes created
   * @param   {String} input input query supplied by the user
   * @param   {String} fileName the filename user wants to search
   * @returns {Object} searchResult object containing search results
   */
  searchIndex(input, fileName) {
    const searchResult = {};
    const allSearchResult = {};
    const query = InvertedIndex.removeSpecialXters(input);
    const uniqueQuery = InvertedIndex.removeDuplicateWords(query, []);
    if (fileName === 'all') {
      // key represent the current filename
      Object.keys(this.allFiles).forEach((key) => {
        // searchResultKey is to store search results
        const searchResultKey = {};
        // searchCurrentJson is an object of indexes for the current file
        const searchCurrentJson = this.allFiles[key];
        uniqueQuery.forEach((eachQuery) => {
          if (eachQuery in searchCurrentJson) {
            // current search word token exists
            searchResultKey[eachQuery] =
              searchCurrentJson[eachQuery];
          } else {
            searchResultKey[eachQuery] = {
              0: false
            };
          }
        });
        searchResult[key] = searchResultKey;
      });
    } else {
      uniqueQuery.forEach((word) => {
        if (typeof this.allFiles[fileName] !== 'undefined' && this
          .allFiles[fileName][word]) {
          searchResult[word] = this.allFiles[fileName][word];
        } else {
          searchResult[word] = {
            0: false
          };
        }
      });
    }
    return searchResult;
  }

  /**
   * isJsonEmpty
   * Checks if an object is empty
   * @param   {Object} book A book object
   * @returns {Boolean} A boolean value to indicate if book is empty or not
   */
  static isJsonEmpty(book) {
    if (book.length === 0) {
      return true;
    }
    return false;
  }
}

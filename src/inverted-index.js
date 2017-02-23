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
    let uniqueWords = [];
    fileContent.forEach((obj) => {
      if (obj.title && obj.text) {
        const objTitle = this.removeSpecialXters(obj.title);
        const objText = this.removeSpecialXters(obj.text);
        const objTitleText = `${objTitle},${objText}`;
        uniqueWords.push(this.removeDuplicateWords(objTitle, objText));
      }
    });
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
    let validateJson = this.validate(fileContents);
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
  removeSpecialXters(obj) {
    return obj.toLowerCase().match(/\w+/g);
  }

  /**
   * removeDuplicateWords
   * Removes multiple occurence of words
   * @param   {Object} objTitle Object containing page title
   * @param   {Object} objText Object containing page text
   * @returns {Object} A unique set of words from the page title and text
   */
  removeDuplicateWords(objTitle, objText) {
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
    singlePage.forEach((word) => {
      if (this.indexedFiles[word] && !this.indexedFiles[word][position]) {
        this.indexedFiles[word][position] = true;
      } else {
        let oneIndex = {};
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
    let searchResult = {};
    let allSearchResult = {};
    let query = this.removeSpecialXters(input);
    let uniqueQuery = this.removeDuplicateWords(query, []);
    if (fileName === 'all' || fileName === null) {
      for (let key in this.allFiles) {
        let searchResultKey = {};
        let searchSingleJson = this.allFiles[key];
        uniqueQuery.forEach((eachQuery) => {
          if (eachQuery in searchSingleJson) {
            searchResultKey[eachQuery] =
              searchSingleJson[eachQuery];
          } else {
            searchResultKey[eachQuery] = {
              0: false
            };
          }
        });
        searchResult[key] = searchResultKey;
      }
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
  isJsonEmpty(book) {
    return (book.length === 0) ? true : false;
  }
}

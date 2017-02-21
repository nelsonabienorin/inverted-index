/**
 * Inverted Index Class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * For Data Initialization
   * @constructor
   */
  constructor() {
    this.allFiles = {};
    this.indexedFiles = {};
  }
  /**
   * validate
   * This checks if a json object has title and text key
   * @param {Object} json
   * @return {Boolean}
   */
  validate(json) {
    for (let item of json) {
      if (!item.title && !item.text) {
        return false;
      }
    }
    return true;
  }
  /**
   * populateIndex
   * Populates the indexes and values of the words by
   * removing special characters, duplicates and arrange index
   * @param {String} fileName
   * @param {Object} fileContent
   * @return {Void}
   */
  populateIndex(fileName, fileContent) {
    let uniqueWords = [];
    let objTitle = '';
    let objText = '';
    let objTitleText;
    fileContent.forEach((obj) => {
      if (obj.title && obj.text) {
        objTitle = this.removeSpecialXters(obj.title);
        objText = this.removeSpecialXters(obj.text);
        objTitleText = `${objTitle},${objText}`;
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
    const validateJson = this.validate(fileContents);
    if (validateJson) {
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
   * @returns {Object}
   */
  removeSpecialXters(obj) {
    return obj.toLowerCase().match(/\w+/g);
  }
  /**
   * removeDuplicateWords
   * Removes multiple occurence of words
   * @param   {Object} objTitle
   * @param   {Object} objText
   * @returns {Object}
   */
  removeDuplicateWords(objTitle, objText) {
    return [...new Set([...objTitle, ...objText])];
  }
  /**
   * arrangeIndex
   * Arranges and sets the position of each word
   * @param {Object} singlePage
   * @param {number} position
   * @return {Void}
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
   * @param   {String} input
   * @param   {String} fileName
   * @returns {Object}
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
      return searchResult;
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
   * @param   {Object} book
   * @returns {Boolean}
   */
  isJsonEmpty(book) {
    return (book.length === 0) ? true : false;
  }
}

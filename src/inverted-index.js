/* eslint-disable no-unused-vars*/
/* eslint-disable no-multi-assign*/
/* eslint-disable no-undef*/

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
   * sanitizeWords
   * removing special characters, duplicates and arrange index
   * @param {String} fileName
   * @param {Object} fileContent
   * @returns {any} does not result to other method
   */
  static sanitizeWords(fileName, fileContent) {
    const uniqueWords = [];
    fileContent.forEach((doc) => {
      if (doc.title && doc.text) {
        const docText = Helper.removeSpecialXters(doc.text);
        uniqueWords.push(Helper.removeMultiWordsAndMakeArray(docText));
      }
    });
    return uniqueWords;
  }

  /**
   * createIndex
   * creates the index for a particular file
   * @param {String}  fileName
   * @param {Object}  fileContents
   * @return {Object} this.allFiles[fileName]
   */
  createIndex(fileName, fileContents) {
    const validateJson = Helper.validate(fileContents);
    if (validateJson === true) {
      const uniqueWords = InvertedIndex.sanitizeWords(fileName, fileContents);
      uniqueWords.forEach((doc, position) => {
        this.arrangeIndex(doc, position);
      });
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
   * arrangeIndex
   * Arranges and sets the position of each word
   * @param {Object} singlePage An object that have page title and text
   * @param {number} position The position of where a word is located
   * @return {any} Does not return result to other function
   */
  arrangeIndex(singlePage, position) {
    singlePage.forEach((word) => {
      if (this.indexedFiles[word] && !this.indexedFiles[word][position]) {
        this.indexedFiles[word][position] = true;
      } else {
        const wordIndex = {};
        wordIndex[position] = true;
        this.indexedFiles[word] = wordIndex;
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
    const query = Helper.removeSpecialXters(input);
    const uniqueQueryWords = Helper.removeMultiWordsAndMakeArray(query);
    if (fileName === 'all') {
      Object.keys(this.allFiles).forEach((key) => {
        const searchResultKey = {};
        const currentDoc = this.allFiles[key];
        uniqueQueryWords.forEach((word) => {
          if (word in currentDoc) {
            searchResultKey[word] =
              currentDoc[word];
          } else {
            searchResultKey[word] = {
              0: false
            };
          }
        });
        searchResult[key] = searchResultKey;
      });
    } else {
      uniqueQueryWords.forEach((word) => {
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
}

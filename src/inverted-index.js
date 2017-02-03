/**
 * An Inverted Index Application class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   **/
  constructor() {
    this.indexFile = {};
    this.singleIndex = {};
    this.allIndexFile = {};
    this.searchResult = {};
    this.msg = '';
    this.myTest = 'my test';
  }
  /**
   * Create index
   * @param {Array} jsonArray
   * @param {string} fileName
   * @return {Boolean}
   */
  createIndex(jsonArray, fileName) {
    if (typeof jsonArray === 'object' && typeof fileName === 'string' && jsonArray.length !== 0 && fileName.length !== 0) {
      jsonArray.forEach((obj, position) => {
        if (obj.title && obj.text) {
          // removes all special characters
          const objTitle = obj.title.toLowerCase().match(/\w+/g);
          const objText = obj.text.toLowerCase().match(/\w+/g);
          // set method removes duplicate words and also return result as an array
          const objTitleText = [...new Set([...objTitle, ...objText])];
          this.bookIndex(objTitleText, position);
        } else {
          return false;
        }
      });
      // allIndexFile object stores all the filenames as key with their  values as an array of content
      this.allIndexFile[fileName] = this.singleIndex;
      const functionCallName = 'create';
      // return needed for displaytoView
      appObj.displayToView(this.singleIndex, functionCallName, fileName);
      // singleIndex is re-initialised
      this.singleIndex = {};
      return true;
    } else {
      return false;
    }
  }
  // book Index is not supose to be here
  /**
   * Function bookIndex
   * @param {Array} objTitleText
   * @param {Number} position
   */
  bookIndex(objTitleText, position) {
    objTitleText.forEach((word) => {
      // word does not exit
      if (this.singleIndex[word]) {
        if (this.singleIndex[word] !== position) {
          // First occurence of token
          this.singleIndex[word].push(position);
        }
      } else {
        // second occurence of token is pushed into existing object value
        this.singleIndex[word] = [position];
      }
    });
  }
  /**
   * Search Index.
   * @param {String} query
   * @param {String} filterName
   * @return {Object} searchResult
   */
  searchIndex(query, fileName) {
    this.searchResult = {};
    if ((typeof query && typeof fileName) === 'string' || typeof query === 'object') {
      query = query.toLowerCase().match(/\w+/g);
      if (query === null) {
        this.msg = 'You have to enter a valid input!!';
        appObj.notificationBoard(this.msg, 'error');
      }
      let tokenWithHighIndex = 0;
      query.forEach((word) => {
        if (typeof this.allIndexFile[fileName] !== 'undefined' && this.allIndexFile[fileName][word]) {
          this.searchResult[word] = this.allIndexFile[fileName][word];
        } else {
          return false;
        }
      });
      if (Object.keys(this.searchResult).length === 0) {
        this.msg = 'No search result found for : ' + query;
        appObj.notificationBoard(this.msg, 'error');
        appObj.emptyTable('search');
      } else {
        const functionCallName = 'search';
        appObj.displayToView(this.searchResult, functionCallName, fileName);
      }
    }
  }
  /**
   * getIndex
   * @return {Object}
   */
  getIndex(jsonName) {
    return this.allIndexFile[jsonName];
  }
}

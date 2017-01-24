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
  }
  /**
   * Create index
   * @param {Array} book
   * @return {Object}
   */
  createIndex(jsonArray, jsonName) {
    jsonArray.forEach((obj, position) => {
      // removes all special characters
      const objTitle = obj.title.toLowerCase().match(/\w+/g);
      const objText = obj.text.toLowerCase().match(/\w+/g);
      // set method removes duplicate words and also return result as an array
      let objTitleText = [...new Set([...objTitle, ...objText])];
      this.bookIndex(objTitleText, position);
    });
    // allIndexFile object stores all the filenames as key with their  values as an array of content
    this.allIndexFile[jsonName] = this.singleIndex;
    let functionCallName='create';
    validateobj.displayToView(this.singleIndex,functionCallName);
     // singleIndex is re-initialised
    this.singleIndex = {};
  }
  /**
   * bookIndex
   */
  bookIndex(objTitleText, position) {
    objTitleText.forEach((word) => {
      // word does not exit
      if (this.singleIndex[word]) {
        if (this.singleIndex[word] !== position) {  // First occurence of token
          this.singleIndex[word].push(position);
        }
      } else {
        this.singleIndex[word] = [position]; // second occurence of token is pushed into existing object value
      }
    });
  }
  /**
   * Search Index.
   * @param {String} query query string
   * @param {String} filterName name of index to be searched.
   * @return {Object} searchResult
   */
  searchIndex(query, jsonName) {
    query = query.toLowerCase().match(/\w+/g);
    let searchResult = {};
    query.forEach((word) => {
      if (this.allIndexFile[jsonName][word]) {
        searchResult[word] = this.allIndexFile[jsonName][word];
      }
    });
    if (searchResult.length === 0) {
      alert('No search result found for ' + query);
    }
    let functionCallName='search';
     validateobj.displayToView(searchResult,functionCallName);
  }
  /**
   * getIndex
   * @return {Object}
   */
  getIndex(jsonName) {
    return this.allIndexFile[jsonName];
  }
}
// Create instance for InvertedIndexClass
let invertedClassObj = new InvertedIndex();
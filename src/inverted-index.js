/**
 * An Inverted Inverted Application class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
  **/
  constructor() {
    this.allfileIndex = {};
    this.titleAndText = [];
    this.allUniqueTokens = {};
    this.allWords = ' ';
    this.titleText = '';
    this.wordIndexes = {};
    this.myinstance = new InvertedIndexUtility ();
  }
  /**
   * Create index
   * @param {Array} book
   * @return {Object}
   */
  createIndex(book) {
    $.each(book, (index, value) => {
      this.titleText = value.title + ' ' + value.text + ' ';
      let cleanTitleText = this.myinstance.cleanWords(this.titleText);
      this.allWords += cleanTitleText;
      let uniqueBookWords = this.myinstance.removeMultipleWords(cleanTitleText);
      this.titleAndText[index] = uniqueBookWords;
    });
    this.allUniqueTokens = this.myinstance.removeMultipleWords(this.allWords).split(' ');
    this.allUniqueTokens.forEach((token) => {
      if (token !== '' && typeof token !== 'undefined') {
        this.wordIndexes[token] = []; // create a key based on unique token
        this.titleAndText.forEach((book, bookIndex) => {
        let bookArray = book.split(' ');
          bookArray.forEach((bookToken, bookTokenIndex) => {
            if (bookToken === token) {
              this.wordIndexes[token].push(bookIndex);
            }
          });
        });
      }
    });
   this.myinstance.displayToView(this.wordIndexes);
  }
  /**
   * Search Index.
   * @param {String} query query string
   * @param {String} filterName name of index to be searched.
   * @return {Object} searchResult
  */
  searchIndex() {

  }
  /**
   * Get a particular index
   * @param {String} jsonName
   * @return {Object}
   */
  getIndex() {
      return this.wordIndexes;
  }
}
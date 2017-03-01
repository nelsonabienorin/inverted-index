/* eslint-disable no-unused-vars*/
/* eslint-disable no-multi-assign*/
/* eslint-disable no-undef*/

/**
 * An Helper class
 * @class
 */
class Helper {
  /**
   * Helper
   * Checks if an object is empty
   * @param   {Object} book A book object
   * @returns {Boolean} A boolean value to indicate if book is empty or not
   */
  static isDocEmpty(book) {
    if (book.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * validate
   * This checks if a json object has title and text key
   * @param {Object} book
   * @returns {boolean} this.ifKeyExist
   */
  static validate(book) {
    book.forEach((doc) => {
      if (doc.title && doc.text) {
        this.ifKeyExist = true;
      } else {
        this.ifKeyExist = false;
      }
    });
    return this.ifKeyExist;
  }

  /**
   * removeSpecialXters
   * Searches through all words in object and remove special characters
   * @param   {Object} doc
   * @returns {Object} returns words void of special characters
   */
  static removeSpecialXters(doc) {
    return doc.toLowerCase().match(/\w+/g);
  }

  /**
   * removeDuplicateWords
   * Removes multiple occurence of words
   * @param   {Object} docText Object containing page text
   * @returns {Object} A unique set of words from the page title and text
   */
  static removeDuplicateWords(docText) {
    return [...new Set([...docText])];
  }
}

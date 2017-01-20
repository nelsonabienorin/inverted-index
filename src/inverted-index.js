/**
 * An Inverted Inverted Application
 */
class InvertedIndex {
  /**
   * Constructor to initialise
   */

  constructor() {
    // let this.index = {};
    // let this.titleAndText = [];
    // let this.allUniqueTokens = {};
    // let this.allWords = ' ';
  }
  /**
   * A function to validate uploaded file
   */
  static validateFile() {
    const filename = 'jasmine/' + document.getElementById('filename_id').value;
    const extension = filename.split('.').pop();
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    let uploadInfoId = document.getElementById('uploadinfo_id');
    if (extension === 'json') {
      jQuery.getJSON(filename, (book) => {
        const bookCounter = book.length;
        if (bookCounter > 0 && typeof book === 'object') {
          uploadInfoId.innerHTML = 'File uploaded successfully !';
          uploadInfoId.className = 'green-text text-darken-3';
          InvertedIndex.createIndex(book);
        } else {
          alert('No json object found !');
        }
      });
    } else {
      uploadInfoId.innerHTML = 'Oops! Invalid file Input detected!';
      uploadInfoId.className = 'red-text text-darken-3';
    }
  }

  static createIndex(book) {
    let index = {};
    let titleAndText = [];
    let allUniqueTokens = {};
    let allWords = ' ';
    $.each(book, (index, value) => {
      let titleText = value.title + ' ' + value.text + ' ';
      let cleanTitleText = InvertedIndex.cleanWords(titleText);
      allWords += cleanTitleText;
      let uniqueBookWords = InvertedIndex.removeMultipleWords(cleanTitleText);
      titleAndText[index] = uniqueBookWords;
    });
    allUniqueTokens = InvertedIndex.removeMultipleWords(allWords).split(' ');
    console.log(allUniqueTokens);
    allUniqueTokens.forEach((token) => {
      if (token !== '') {
        titleAndText.forEach((book, bookIndex) => {
          let bookArray = book.split(' ');
          bookArray.forEach((bookToken) => {
            if (bookToken === token) {
              console.log(token + ' found at doc ' + (bookIndex + 1));
            }
          });
        });
      }
    });
  }

  static cleanWords(titleAndText) {
    return titleAndText.replace(/[^a-z\d\s]+/gi, ' ');
  }
  /**
   * Function removeMultipleWords to
   * remove multiple occurrences of
   * words
   */
  static removeMultipleWords(words) {
    let uniqueWords = words.toLowerCase().split(' ').sort().filter((item, i, allItems) => i === allItems.indexOf(item))
      .join(' ');
    return uniqueWords;
  }
}
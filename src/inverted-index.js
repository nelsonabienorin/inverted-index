/**
 * An Inverted Inverted Application
 */
class InvertedIndex {
  /**
   * Constructor to initialise
   */

  constructor() {
    this.texter = '';
  }
  /**
   * A function to validate uploaded file
   */
  static validateFile() {
    const filename = document.getElementById('filename_id').value;
    const extension = filename.split('.').pop();
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    let uploadInfoId = document.getElementById('uploadinfo_id');
    if (extension === 'json') {
      InvertedIndex.readFile(filename, uploadInfoId);
    } else {
      uploadInfoId.innerHTML = 'Oops! Invalid file Input detected!';
      uploadInfoId.className = 'red-text text-darken-3';
    }
  }
  /**
   * A function readFile to read into
   * the content of the json file
   */
  static readFile(filename, uploadInfoId) {
    jQuery.getJSON('jasmine/' + filename, (doc) => {
      const docCounter = doc.length;
      if (docCounter === 0) {
        alert('No json object found !');
      } else {
      uploadInfoId.innerHTML = 'File uploaded successfully !';
      uploadInfoId.className = 'green-text text-darken-3';
        const title = [];
        const text = [];

        for (let i = 0; i < docCounter; i++) {
          title.push(doc[i].title);
          text.push(doc[i].text);
        }
        InvertedIndex.stringifyArray(title, text);
      }
    });
  }
  /**
   * Function stringifyArray to convert array
   * into corresponding text and also remove
   * special characters from the text
   * @param: title
   */
  static stringifyArray(title, text) {
    let rawText = '';
    for (let j = 0; j < text.length; j ++) {
      rawText += text[j];
    }
    const filteredText = rawText.replace(/[^a-z\d\s]+/gi, ' ');
    InvertedIndex.removeMultipleWords(filteredText);
  }
  /**
   * Function removeMultipleWords to
   * remove multiple occurrences of
   * words
   */
  static removeMultipleWords(filteredText) {
    const uniqueList = filteredText.split(' ').filter((item, i, allItems) => i === allItems.indexOf(item)).join(' ').toLowerCase();
    console.log(uniqueList.split(' ').sort());
  }
}

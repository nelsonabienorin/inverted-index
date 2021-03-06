/**
 * An Inverted Index Utility class
 * @class
 */
class Util {
  /**
   * class constructor
   * Data Initialization
   * @constructor
   */
  constructor() {
    this.rawFile = {};
    this.allFileUploads = {};
    this.msg = '';
    this.fileHighestLength = {};
    this.searchResult = {};
    this.file = {};
  }
  /**
   * Validate json file
   * @param {object} uploadedFile
   * @param: {string} fileName
   * @returns {Boolean} returns a boolean
   */
  validateFile(uploadedFile, fileName, userEvent) {
    this.allFileUploads = invertedClassObj.allFiles;
    this.file = uploadedFile;
    const selectedFile = invertedUIObj.getSelectedFileToCreate();
    if (!this.file || typeof this.file === 'undefined') {
      this.msg = 'No file selected !';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    for (const key in this.allFileUploads) {
      if (key === this.file.name) {
        this.msg = 'File already Exist!';
        invertedUIObj.notificationBoard(this.msg, 'error');
        return false;
      }
    }
    if (this.file.type !== 'application/json') {
      this.msg = 'File MUST be JSON!';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    if (this.file.size === 0) {
      this.msg = 'File cannot be EMPTY!';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    invertedUIObj.fileReader(this.file, userEvent);
  }
  /**
   * Function searchIndexTest to
   * @param {string} searchQuery
   * @returns {null}
   */
  searchIndexTest(searchQuery) {
    const selectedFile = invertedUIObj.getSelectedFileToSearch();
    const functionCallName = 'search';
    if (typeof this.allFileUploads === 'undefined' || this.allFileUploads[selectedFile] === 'undefined' || !this.file.name || typeof this.file === 'undefined') {
      this.msg = 'You have to firstly Create Index!';
      invertedUIObj.notificationBoard(this.msg, 'error');
    } else if (typeof this.file.name === 'undefined') {
      this.msg = 'Empty Input Detected!';
      invertedUIObj.notificationBoard(this.msg, 'error');
    } else {
      if (selectedFile === 'all') {
        this.searchResult = invertedClassObj.searchIndex(searchQuery, selectedFile);
        invertedUIObj.displayToViewAllSearch(this.searchResult, functionCallName);
      }
      if (selectedFile !== null && selectedFile !== 'all') {
        this.searchResult = invertedClassObj.searchIndex(searchQuery,
          selectedFile);
        invertedUIObj.displayToView(this.searchResult, functionCallName, selectedFile);
      }
      if (!selectedFile) {
        this.searchResult = invertedClassObj.searchIndex(searchQuery, this.file.name);
        invertedUIObj.displayToView(this.searchResult, functionCallName, this.file.name);
      }
    }
  }
}

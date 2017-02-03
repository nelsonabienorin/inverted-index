/**
 * An Inverted Index Utility class
 * @class
 */
class Util {
  /**
   * class constructor
   * @constructor
   * For Data Initialization
   **/
  constructor() {
    this.content = '';
    this.icon = '';
    this.rawFile = {};
    this.allFileUploads = {};
    this.msg = '';
    this.fileHighestLength = {};
  }
  /**
   * Function validateFile to
   * validate if file input
   * is a json file
   * @returns {Boolean}
   */
  validateFile(fileToUpload) {
    this.file = fileToUpload;
    let selectedFile = getSelectedFileToCreate();
    for (let key in this.allFileUploads) {
      if (key === this.file.name) {
        this.msg = 'File already Exist!';
        invertedUIObj.notificationBoard(this.msg, 'error');
      }
    }
    if (!this.file) {
      this.msg = 'No file selected';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
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
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const content = fileReader.result;
      const fileContent = JSON.parse(content);
      invertedIndex.createIndex(filecontent, filename);
      if (content.indexOf('title') === -1 || content.indexOf('text') === -1) {
        this.msg = 'Invalid content found in JSON file !';
        invertedUIObj.notificationBoard(this.msg, 'error');
        return false;
      }

      if (fileContent.length === 0) {
        this.msg = 'File cannot be EMPTY!';
        invertedUIObj.notificationBoard(this.msg, 'error');
      } else {
        if (this.allFileUploads[this.file.name]) {
          this.msg = 'File already Exist !';
          invertedUIObj.notificationBoard(this.msg, 'error');
        } else {
          this.msg = 'File uploaded successfully !';
          invertedUIObj.notificationBoard(this.msg, 'success');
          this.allFileUploads[this.file.name] = fileContent;
          invertedUIObj.populateSelectBox(this.file.name);
          if (selectedFile !== null) {
            invertedClassObj.createIndex(fileContent, selectedFile);
          } else {
            invertedClassObj.createIndex(fileContent, this.file.name);
          }
          return true;
        }
      }

    };
    fileReader.readAsText(this.file);
  }

  /**
   * Function searchIndexTest to
   * validate if query input
   * is valid
   */
  searchIndexTest(searchQuery) {
    let selectedFile = getSelectedFileToSearch();
    if (searchQuery === '') {
      this.msg = 'Empty Input Detected!';
      invertedUIObj.notificationBoard(this.msg, 'error');
    } else {
      if (typeof this.file === 'undefined' || this.file.name === 'undefined') {
        this.msg = 'You have to firstly Create Index!';
        invertedUIObj.notificationBoard(this.msg, 'error');
      }
      if (this.file.name.length > 0 && searchQuery.length > 0) {
        if (selectedFile !== null) {
          invertedClassObj.searchIndex(searchQuery, selectedFile);
        } else {
          invertedClassObj.searchIndex(searchQuery, this.file.name);
        }
      }
    }
  }

}

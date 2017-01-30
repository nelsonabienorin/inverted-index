/**
 * An Inverted Index Utility class
 * @class
 */
class App {
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
  validateFile() {
    this.file = document.getElementById('files_id').files[0];
    let selectedFile = $(`#selectfilename1`).val();
    for (let key in this.allFileUploads) {
      if (key === this.file.name) {
        this.msg = 'File already Exist!';
        this.notificationBoard(this.msg, 'error');
      }
    }
    if (!this.file) {
      this.msg = 'No file selected';
      this.notificationBoard(this.msg, 'error');
      return false;
    }
    if (this.file.type !== 'application/json') {
      this.msg = 'File MUST be JSON!';
      this.notificationBoard(this.msg, 'error');
      return false;
    }
    if (this.file.size === 0) {
      this.msg = 'File cannot be EMPTY!';
      this.notificationBoard(this.msg, 'error');
      return false;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const content = fileReader.result;
      if (content.indexOf('title') === -1 || content.indexOf('text') === -1) {
        this.msg = 'Invalid content found in JSON file !';
        this.notificationBoard(this.msg, 'error');
        return false;
      }
      const fileContent = JSON.parse(content);
      if (fileContent.length === 0) {
        this.msg = 'File cannot be EMPTY!';
        this.notificationBoard(this.msg, 'error');
      } else {
        if (this.allFileUploads[this.file.name]) {
          this.msg = 'File already Exist !';
          this.notificationBoard(this.msg, 'error');
        } else {
          this.msg = 'File uploaded successfully !';
          this.notificationBoard(this.msg, 'success');
          this.allFileUploads[this.file.name] = fileContent;
          this.populateSelectBox(this.file.name);
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
   * Function displayToView
   * output result to html
   * @param:{object} result
   * @param:{string} functionCallName
   */
  displayToView(result, functionCallName, filename) {
    let objWithHighIndex = 0;
    $(`#${functionCallName}indextable`).empty();
    this.content = "<table class='striped'>";
    this.icon = "<i class='material-icons'>done</i>";
    if (typeof result !== 'undefined') {
      this.content += '<tr class=\'card\' green text-white><th>Word</th>';
      // This part loops through to get the object with
      // the highest index
      if (this.fileHighestLength[filename]) {
        objWithHighIndex = this.fileHighestLength[filename];
      } else {
        for (let term in result) {
          objWithHighIndex = (result[term].length > objWithHighIndex) ? result[term].length : objWithHighIndex;
        }
      }
      this.fileHighestLength[filename] = objWithHighIndex;
      // this generates/builds the header
      for (let i = 1; i <= objWithHighIndex; i += 1) {
        this.content += `<th>Doc ${i} </th>`;
      }
      this.content += '</tr>';
      // this handles the building of the body and its content
      const found = this.icon;
      const notFound = 'X';
      for (let term in result) {
        this.content += `<tr><td>  ${term}  </td>`;
        let curArr = result[term];
        for (let j = 0; j < objWithHighIndex; j++) {
          if (curArr.indexOf(j) >= 0) {
            this.content += `<td class = 'green-text'> ${found} </td>`;
          } else {
            this.content += `<td class = 'red-text'> ${notFound} </td>`;
          }
        }
        this.content += '</tr>';
      }
      this.content += '</table>';
      $(`#${functionCallName}indextable`).append(this.content);
    }
  }
  /**
   * Function displayToView
   * output result to html
   * @param:{string} msg
   * @param:{string} msgType
   */
  notificationBoard(msg, msgType) {
    let classAttr = '';
    if (msgType === 'success') {
      classAttr = 'green-text text-darken-3';
    } else {
      classAttr = 'red-text text-darken-3';
    }
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    const uploadInfoId = document.getElementById('uploadinfo_id');
    uploadInfoId.innerHTML = msg;
    uploadInfoId.className = classAttr;
  }
  /**
   * Function searchIndexTest to
   * validate if query input
   * is valid
   */
  searchIndexTest() {
    let searchQuery = document.getElementById('search').value;
    let selectedFile = $(`#selectfilename2`).val();
    if (searchQuery === '') {
      this.msg = 'Empty Input Detected!';
      this.notificationBoard(this.msg, 'error');
    } else {
      if (typeof this.file === 'undefined' || this.file.name === 'undefined') {
        this.msg = 'You have to firstly Create Index!';
        this.notificationBoard(this.msg, 'error');
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
  /**
   * Function populateSelectBox to
   * populate select box if file uploaded
   * is valid
   */
  populateSelectBox(filename) {
    const selectFilename1 = document.getElementById('selectfilename1');
    const selectFilename2 = document.getElementById('selectfilename2');
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.text = filename;
    option2.text = filename;
    selectFilename1.add(option1);
    selectFilename2.add(option2);
  }
  /**
   * Function hideNotificationBoard to
   * hide notification
   */
  hideNotificationBoard() {
    let panelId = document.getElementById('uploadinfo_panel');
    let attr = document.createAttribute('hidden');
    panelId.setAttributeNode(attr);
  }
  /**
   * Function emptyTable to
   * empty the table content
   */
  emptyTable(tableName) {
    $(`#` + tableName + `indextable`).empty();
  }
}

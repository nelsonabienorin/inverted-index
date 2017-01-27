/**
 * An Inverted Index Utility class
 * @class
 */
class InvertedIndexUtility {
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
        return;
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
  displayToView(result, functionCallName) {
    $(`#${functionCallName }indextable`).empty();
    this.content = "<table class='striped'>";
    this.icon = "<i class='material-icons'>done</i>";
    if (typeof result !== 'undefined') {
      this.content += '<tr><th>Word</th><th>Doc1</th><th>Doc2</th></tr>';
      for (const key in result) {
        // displays the token
        this.content += `<td>${key }</td>`;
        // an array of tokens location in document
        const docLocation = result[key];
        if (docLocation.length === 1) {
          if (docLocation[0] === 0) {
            this.content += `<td>${this.icon }</td><td></td>`;
          } else {
            this.content += `<td></td><td>${this.icon}</td>`;
          }
          this.content += '</tr>';
        } else {
          this.content += `<td>${this.icon }</td><td>${this.icon }</td></tr>`;
        }
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
        this.msg = 'You have to upload file to create Index!';
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
// Create instance for InvertedIndexUtility
const validateobj = new InvertedIndexUtility();
// An event listener to listen to change in uploaded file
document.getElementById('files_id').addEventListener('change', (e) => {
  validateobj.emptyTable('create');
  validateobj.hideNotificationBoard();
});
// An event listener to listen to change in select box
document.getElementById('selectfilename1').addEventListener('change', (e) => {
  validateobj.emptyTable('create');
  const selectedFile = $(`#selectfilename1`).val();
  const functionCallName = 'create';
  if (invertedClassObj.allIndexFile[selectedFile]) {
    validateobj.displayToView(invertedClassObj.allIndexFile[selectedFile], functionCallName);
    const msg = 'Index  Successfully Created !';
    validateobj.notificationBoard(msg, 'success');
  }
});
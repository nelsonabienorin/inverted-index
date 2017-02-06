/**
 * InvertedIndexUI class - A class for managing rendering contents to the user
 * @class
 */
class InvertedIndexUI {
  /**
   * constructor Creates Object variables to hold
   */
  constructor() {
    this.content = '';
    this.icon = '';
    this.allFileUploads = {};
    this.indexedFile = {};
    this.fileHighestLength = {};
  }
  /**
   * getSelectedFileToCreate()
   * @param
   * @return {object} value of selected option
   */
  getSelectedFileToCreate() {
    return $('#selectfilename1').val();
  }
  /**
   * getSelectedFileToSearch
   * @param
   * @return {object} value of selected option
   */
  getSelectedFileToSearch() {
    return $('#selectfilename2').val();
  }
  /**
   * fileReader
   * @param {object} file
   * @return {boolean}
   */
  fileReader(file) {
    const fileReader = new FileReader();
    this.allFileUploads = invertedClassObj.allFiles;
    fileReader.onload = () => {
      const content = fileReader.result;
      const jsonContent = JSON.parse(content);
      if (content.indexOf('title') === -1 || content.indexOf('text') === -1) {
        this.msg = 'Invalid content found in JSON file !';
        invertedUIObj.notificationBoard(this.msg, 'error');
        return false;
      }
      if (jsonContent.length === 0) {
        this.msg = 'File cannot be EMPTY!';
        invertedUIObj.notificationBoard(this.msg, 'error');
      } else {
        if (this.allFileUploads[file.name]) {
          this.msg = 'File already Exist !';
          invertedUIObj.notificationBoard(this.msg, 'error');
        } else {
          this.msg = 'File uploaded successfully !';
          invertedUIObj.notificationBoard(this.msg, 'success');
          this.allFileUploads[file.name] = jsonContent;
          invertedUIObj.populateSelectBox(file.name);
          const selectedFile = this.getSelectedFileToCreate();
          let fileNameToSend = '';
          if (selectedFile !== null) {
            fileNameToSend = selectedFile;
          } else {
            fileNameToSend = file.name;
          }
          this.indexedFile = invertedClassObj.createIndex(fileNameToSend, jsonContent);
          const functionCallName = 'create';
          this.displayToView(this.indexedFile, functionCallName, fileNameToSend);
        }
      }
    };
    fileReader.readAsText(file);
  }
  /**
   * Function displayToView
   * @param:{object} result
   * @param:{string} functionCallName
   * @param:{string} filename
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
          objWithHighIndex = (Object.keys(result[term]).length > objWithHighIndex) ? Object.keys(result[term]).length : objWithHighIndex;
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
          if (curArr[j] === true) {
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
   * Function populateSelectBox to
   * populate select box if file uploaded
   * is valid
   * @param:{string} filename
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
    $('.all').show();
  }
  /**
   * Function hideNotificationBoard to
   * hide notification
   * @param
   * @return
   */
  hideNotificationBoard() {
    const panelId = document.getElementById('uploadinfo_panel');
    const attr = document.createAttribute('hidden');
    panelId.setAttributeNode(attr);
  }
  /**
   * Function emptyTable to
   * empty the table content
   * @param {string} tableName
   * @return
   */
  emptyTable(tableName) {
    $(`#${tableName}indextable`).empty();
  }
  /**
   * Function displayToViewAllSearch
   * output result to html
   * @param:{object} result
   * @param:{string} functionCallName
   */
  displayToViewAllSearch(result, functionCallName) {
    $(`#${functionCallName}indextable`).empty();
    let jsonFileContent = {};
    const found = this.icon;
    const notFound = 'X';
    this.content = "<table class='highlight'>";
    for (let jsonFileNames in result) {
      this.content += `<thead><tr><th>File Name: ${jsonFileNames}</th></tr></thead>`;
      this.content += '<thead class=\'card\'><tr class=\'card\'><th class=\' card\'>Word</th>';
      // this generates/builds the header
      for (let i = 1; i <= this.fileHighestLength[jsonFileNames]; i += 1) {
        this.content += `<th class=\'card\'>Doc ${i} </th>`;
      }
      this.content += '</tr></thead><tbody>';
      jsonFileContent = result[jsonFileNames];
      for (let term in jsonFileContent) {
        this.content += `<tr><td>  ${term}  </td>`;
        let curArr = jsonFileContent[term];
        for (let j = 0; j < this.fileHighestLength[jsonFileNames]; j++) {
          if (curArr[j] === true) {
            this.content += `<td class = 'green-text'> ${found} </td>`;
          } else {
            this.content += `<td class = 'red-text'> ${notFound} </td>`;
          }
        }
        this.content += '</tr>';
      }
    }
    this.content += '</tbody></table>';
    $(`#${functionCallName}indextable`).append(this.content);
  }
}

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
    this.jsonContent = {};
    this.uploadedFileName = '';
  }
  /**
   * getSelectedFileToCreate
   * @returns {object} value of selected option.
   */
  getSelectedFileToCreate() {
    return $('#selectfilename1').val();
  }
  /**
   * getSelectedFileToSearch
   * @return {String} value of selected option.
   */
  getSelectedFileToSearch() {
    return $('#selectfilename2').val();
  }
  /**
   * fileReader
   * @param {Object} file
   * @param {String} userEvent
   * @return {Boolean}
   */
  fileReader(file, userEvent) {
    const fileReader = new FileReader();
    this.allFileUploads = invertedClassObj.allFiles;
    fileReader.onload = () => {
      const content = fileReader.result;
      this.jsonContent = JSON.parse(content);
      if (content.indexOf('title') === -1 || content.indexOf('text') === -1) {
        this.msg = 'Invalid content found in JSON file !';
        invertedUIObj.notificationBoard(this.msg, 'error');
        return false;
      }
      if (this.jsonContent.length === 0) {
        this.msg = 'File cannot be EMPTY!';
        invertedUIObj.notificationBoard(this.msg, 'error');
      }
      if (!this.allFileUploads[file.name]) {
        this.msg = `File ${file.name} uploaded successfully,
        you can now ceate Index`;
        invertedUIObj.notificationBoard(this.msg, 'success');
        this.allFileUploads[file.name] = this.jsonContent;
        this.uploadedFileName = file.name;
        const selectedFile = this.getSelectedFileToCreate();
        this.callCreateIndex(userEvent, file.name);
      }
    };
    fileReader.readAsText(file);
  }
  /**
   * callCreateIndex
   * Makes call to the function createIndex
   * @param {string} userEvent
   * @param {string} fileName
   * @return {Void}
   */
  callCreateIndex(userEvent, fileName) {
    if (userEvent !== 'change') {
      if (typeof this.allFileUploads[fileName] === 'object') {
        this.indexedFile = invertedClassObj.createIndex(fileName,
          this.jsonContent);
        const functionCallName = 'create';
        this.displayToView(this.indexedFile, functionCallName, fileName);
        if (!$(`#selectfilename1 option[value =
        '${this.uploadedFileName}']`).prop('selected', true).length) {
          invertedUIObj.populateSelectBox(this.uploadedFileName);
        }
      }
    }
  }
  /**
   * displayToView
   * @param {Object} result
   * @param:{String} functionCallName
   * @param:{String} filename
   * @return:{Void}
   */
  displayToView(result, functionCallName, filename) {
    let objWithHighIndex = 0;
    $(`#${functionCallName}indextable`).empty();
    this.content = `<a class='btn card'>${filename}</a><br/>`;
    this.content += "<table class='striped'>";
    this.icon = "<i class='material-icons'>done</i>";
    if (typeof result !== 'undefined') {
      this.content += '<tr class=\'card\' green text-white><th>Word</th>';
      // This part loops through to get the object with
      // the highest index
      if (this.fileHighestLength[filename]) {
        objWithHighIndex = this.fileHighestLength[filename];
      } else {
        for (let term in result) {
          if (Object.keys(result[term]).length > objWithHighIndex) {
            objWithHighIndex = Object.keys(result[term]).length;
          }
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
        for (let j = 0; j < objWithHighIndex; j += 1) {
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
   * notificationBoard output result to html
   * @param {string} msg
   * @param:{string} msgType
   */
  notificationBoard(msg, msgType) {
    let classAttr = '';
    if (msgType === 'success') {
      classAttr = 'green-text text-darken-3';
    } else {
      classAttr = 'red-text text-darken-3';
      this.clearInputFileName();
    }
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    const uploadInfoId = document.getElementById('uploadinfo_id');
    uploadInfoId.innerHTML = msg;
    uploadInfoId.className = classAttr;
  }
  /**
   * populateSelectBox populate select box if file uploaded
   * @param:{string} filename
   */
  populateSelectBox(filename) {
    const selectFilename1 = document.getElementById('selectfilename1');
    const selectFilename2 = document.getElementById('selectfilename2');
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.text = filename;
    option1.value = filename;
    option2.text = filename;
    option2.value = filename;
    selectFilename1.add(option1);
    selectFilename2.add(option2);
    $('.all').show();
  }
  /**
   * hideNotificationBoard hides notification
   */
  hideNotificationBoard() {
    const panelId = document.getElementById('uploadinfo_panel');
    const attr = document.createAttribute('hidden');
    panelId.setAttributeNode(attr);
  }
  /**
   * emptyTable empty the table content
   * @param {string} tableName
   */
  emptyTable(tableName) {
    $(`#${tableName}indextable`).empty();
  }
  /**
   * displayToViewAllSearch
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
      this.content += `<thead><tr><th>File Name: ${jsonFileNames}</th></tr>
      </thead>`;
      this.content += '<thead><tr><th class=\' card\'>Word</th>';
      // this generates/builds the header
      for (let i = 1; i <= this.fileHighestLength[jsonFileNames]; i += 1) {
        this.content += `<th class=\'card\'>Doc ${i} </th>`;
      }
      this.content += '</tr></thead><tbody>';
      jsonFileContent = result[jsonFileNames];
      for (let term in jsonFileContent) {
        this.content += `<tr><td>  ${term}  </td>`;
        let curArr = jsonFileContent[term];
        for (let j = 0; j < this.fileHighestLength[jsonFileNames]; j += 1) {
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
  /**
   * clearInputFileName
   * clears the filename in textbox
   * @param {Void}
   * @return {Void}
   */
  clearInputFileName() {
    const fileId = $('#files_id');
    const fileNameId = $('#filename_id');
    fileId.replaceWith(fileId.val('').clone(true));
    fileNameId.replaceWith(fileNameId.val('').clone(true));
  }
}

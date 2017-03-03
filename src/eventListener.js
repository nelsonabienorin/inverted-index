// An instance of the InvertedIndex class
const invertedClassObj = new InvertedIndex();
// An instance of invertedIndexUI class
const invertedUIObj = new InvertedIndexUI();
// An instance of the App class
const utilObj = new Util();
// An event listener to listen to change in uploaded file
$('#files_id').change(() => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.hideNotificationBoard();
  const fileName = $('#filename_id').val();
  const uploadedFiles = document.getElementById('files_id').files;
  const userEvent = 'change';
  for (let j = 0; j < uploadedFiles.length; j += 1) {
    utilObj.validateFile(uploadedFiles[j], fileName, userEvent);
  }
});
// An event listener to listen to change in select box by user
$('#create_id').click(() => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const selectedFile = $('#selectfilename1').val();
  const functionCallName = 'create';
  if (invertedClassObj.allFiles[selectedFile]) {
    invertedUIObj.displayToView(
      invertedClassObj.allFiles[selectedFile],
      functionCallName, selectedFile);
    const msg = `create index successfully,
    view switched to file ${selectedFile}`;
    invertedUIObj.notificationBoard(msg, 'success');
    const fileExist = $(`#selectfilename2
    option[value='${selectedFile}']`).length > 0;
    if (fileExist === false) {
      invertedUIObj.populateSearchSelectBox(selectedFile);
    }
  }
});
// An event listener to listen to when create index button is clicked
$('#search_id').click(() => {
  let noOfOptions = $('#selectfilename2 option').filter(() => {
    return this.value !== null;
  }).length;
  const searchQuery = document.getElementById('search').value;
  if (searchQuery === '') {
    this.msg = 'Empty Input Detected! Please supply valid input';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else if (noOfOptions <= 2) {
    this.msg = 'You have to upload file(s) and create index!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else {
    utilObj.searchIndexTest(searchQuery);
    this.msg = `Showing search result(s) for '${searchQuery}'`;
    invertedUIObj.notificationBoard(this.msg, 'success');
  }
});
// This initialises the modal plugin once the documents is ready
$(document).ready(() => {
  $('.modal').modal();
});

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
  const uploadedFile = document.getElementById('files_id').files[0];
  const userEvent = 'change';
  utilObj.validateFile(uploadedFile, fileName, userEvent);
});
// An event listener to listen to change in select box by user
$('#selectfilename1').change(() => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const selectedFile = $('#selectfilename1').val();
  const functionCallName = 'create';
  if (invertedClassObj.allFiles[selectedFile]) {
    invertedUIObj.displayToView(
      invertedClassObj.allFiles[selectedFile],
      functionCallName, selectedFile);
    const msg = `created index view switched to file ${selectedFile}`;
    invertedUIObj.notificationBoard(msg, 'success');
  }
});
// An event listener to listen to when search index button is clicked
$('#search_id').click(() => {
  let noOfOptions = $('#selectfilename2 option').filter(() => {
    return this.value !== null;
  }).length;
  const searchQuery = document.getElementById('search').value;
  const fileName = $('#filename_id').val();
  if (searchQuery === '') {
    this.msg = 'Empty Input Detected!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else if (fileName === '' || noOfOptions <= 2) {
    this.msg = 'You have to upload a file and create index!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else {
    utilObj.searchIndexTest(searchQuery);
    this.msg = `Showing search result(s) for '${searchQuery}'`;
    invertedUIObj.notificationBoard(this.msg, 'success');
  }
});
// An event listener to listen to create index button when clicked
$('#create_id').click(() => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const functionCallName = 'create';
  const userEvent = 'click';
  const fileName = $('#filename_id').val();
  const uploadedFile = document.getElementById('files_id').files[0];
  if (fileName === '') {
    this.msg = 'You have to upload a file!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else {
    invertedUIObj.callCreateIndex(userEvent, fileName);
    const msg = `created index for ${fileName}`;
    invertedUIObj.notificationBoard(msg, 'success');
  }
});
// An event listener to listen to when the user starts typing
$('#search').keyup(() => {
  $('#selectfilename2').css('display', 'block');
});
// This initialises the modal plugin once the documents is ready
$(document).ready(() => {
  $('.modal').modal();
});

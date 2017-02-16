// An instance of the InvertedIndex class
const invertedClassObj = new InvertedIndex();
// An instance of invertedIndexUI class
const invertedUIObj = new InvertedIndexUI();
// An instance of the App class
const utilObj = new Util();
// An event listener to listen to change in uploaded file
$("#files_id").change(function () {
  invertedUIObj.emptyTable('create');
  invertedUIObj.hideNotificationBoard();
  const fileName = $('#filename_id').val();
  const uploadedFile = document.getElementById('files_id').files[0];
  const userEvent = 'change';
  utilObj.validateFile(uploadedFile, fileName, userEvent);
});
// An event listener to listen to change in select box by user
$("#selectfilename1").change(function () {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const selectedFile = $('#selectfilename1').val();
  const userEvent = 'select';
  invertedUIObj.callCreateIndex(userEvent, selectedFile);
  $('#selectfilename1').prop('selectedIndex', 0);
});
// An event listener to listen to when search index button is clicked
$("#search_id").click(function () {
  const searchQuery = document.getElementById('search').value;
  if (searchQuery === '') {
    this.msg = 'Empty Input Detected!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else {
    utilObj.searchIndexTest(searchQuery);
  }
});
// An event listener to listen to when create index button is clicked
$("#create_id").click(function () {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const functionCallName = 'create';
  const userEvent = 'click';
  const fileName = $('#filename_id').val();
  const uploadedFile = document.getElementById('files_id').files[0];
  invertedUIObj.callCreateIndex(userEvent, fileName);
});
// An event listener to listen to when the user starts typing
$('#search').keyup(() => {
  $('#selectfilename2').css('display', 'block');
});
// This initialises the modal plugin once the documents is ready
$(document).ready(() => {
  $('.modal').modal();
});
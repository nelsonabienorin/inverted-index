// An instance of the InvertedIndex class
const invertedClassObj = new InvertedIndex();
// An instance of invertedIndexUI class
const invertedUIObj = new InvertedIndexUI();
// An instance of the App class
const utilObj = new Util();
// An event listener to listen to change in uploaded file
document.getElementById('files_id').addEventListener('change', (e) => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.hideNotificationBoard();
});

// An event listener to listen to change in select box by user
document.getElementById('selectfilename1').addEventListener('change', (e) => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const selectedFile = $('#selectfilename1').val();
  const functionCallName = 'create';
  if (invertedClassObj.allFiles[selectedFile]) {
    invertedUIObj.displayToView (
      invertedClassObj.allFiles[selectedFile],
      functionCallName, selectedFile);
    const msg = 'Index  Successfully Created !';
    invertedUIObj.notificationBoard(msg, 'success');
  }
});
// An event listener to listen to when create index button is clicked
document.getElementById('search_id').addEventListener('click', () => {
  const searchQuery = document.getElementById('search').value;
  if (searchQuery === '') {
    this.msg = 'Empty Input Detected!';
    invertedUIObj.notificationBoard(this.msg, 'error');
  } else {
    utilObj.searchIndexTest(searchQuery);
  }
});
// An event listener to listen to when search index button is clicked
document.getElementById('create_id').addEventListener('click', () => {
  const fileName = $('#filename_id').val();
  const uploadedFile = document.getElementById('files_id').files[0];
  utilObj.validateFile(uploadedFile, fileName);
});
// An event listener to listen to when the user starts typing
$('#search').keyup(() => {
   $('#selectfilename2').removeAttr('disabled');
});
// This initialises the modal plugin once the documents is ready
$(document).ready(() => {
  $('.modal').modal();
});

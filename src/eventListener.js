// An instance of the App class
 const appObj = new App();
// An instance of the InvertedIndex class
 const invertedClassObj = new InvertedIndex();

// An event listener to listen to change in uploaded file
document.getElementById('files_id').addEventListener('change', (e) => {
  appObj.emptyTable('create');
  appObj.hideNotificationBoard();
});

// An event listener to listen to change in select box
document.getElementById('selectfilename1').addEventListener('change', (e) => {
  appObj.emptyTable('create');
  appObj.emptyTable('search');
  const selectedFile = $(`#selectfilename1`).val();
  const functionCallName = 'create';
  if (invertedClassObj.allIndexFile[selectedFile]) {
    appObj.displayToView(invertedClassObj.allIndexFile[selectedFile], functionCallName);
    const msg = 'Index  Successfully Created !';
    appObj.notificationBoard(msg, 'success');
  }
});
// An event listener to listen to when create index button is clicked
document.getElementById('search_id').addEventListener('click', () => {
  appObj.searchIndexTest();
});
// An event listener to listen to when search index button is clicked
document.getElementById('create_id').addEventListener('click', () => {
  appObj.validateFile();
});

// This initialises the modal plugin once the documents is ready
$(document).ready(function () {
  $('.modal').modal();
});

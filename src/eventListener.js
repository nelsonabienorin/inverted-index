
// An instance of the InvertedIndex class
const invertedClassObj = new InvertedIndex();
 // An instance of invertedIndexUI class
const invertedUIObj = new invertedIndexUI ();
// An instance of the App class
 const utilObj = new Util();
// An event listener to listen to change in uploaded file
document.getElementById('files_id').addEventListener('change', (e) => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.hideNotificationBoard();
  console.log('u hit files');
});

// An event listener to listen to change in select box
document.getElementById('selectfilename1').addEventListener('change', (e) => {
  invertedUIObj.emptyTable('create');
  invertedUIObj.emptyTable('search');
  const selectedFile = $(`#selectfilename1`).val();
  const functionCallName = 'create';
  if (invertedClassObj.allIndexFile[selectedFile]) {
    invertedUIObj.displayToView(invertedClassObj.allIndexFile[selectedFile], functionCallName);
    const msg = 'Index  Successfully Created !';
    invertedUIObj.notificationBoard(msg, 'success');
  }
});
// An event listener to listen to when create index button is clicked
document.getElementById('search_id').addEventListener('click', () => {
  invertedUIObj.searchIndexTest();
  console.log('u hit search');
});
// An event listener to listen to when search index button is clicked
document.getElementById('create_id').addEventListener('click', () => {
  invertedUIObj.validateFile(document.getElementById('files_id').files[0]);
   console.log('u hit create');
});

// This initialises the modal plugin once the documents is ready
$(document).ready(function () {
  $('.modal').modal();
});

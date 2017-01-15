/**
 * An Inverted Inverted Application
 */
class InvertedIndex {
  /**
   * A function to validate uploaded file
   */
  static validateFile() {
    const filename = document.getElementById('filename_id').value;
    const extension = filename.split('.').pop();
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    const uploadInfoId = document.getElementById('uploadinfo_id');
    if (extension === 'json') {
      uploadInfoId.innerHTML = 'File uploaded successfully !';
      uploadInfoId.className = 'green-text text-darken-3';
      console.log('if block.....');
      InvertedIndex.readFile();
    } else {
      uploadInfoId.innerHTML = 'Ops! Invalid file Input detected!';
      uploadInfoId.className = 'red-text text-darken-3';
      console.log('else block.....');
    }
  }
  /**
   * A function readFile to read into
   * the content of the json files
   */
  static readFile() {
    console.log('am in read file');
    jQuery.getJSON('jasmine/books.json', function (doc) {
      console.log('inside jquery scope');
      let docCounter = doc.length;
      //console.log(docCounter);
      if (docCounter === 0) {
        alert('No json object found !');
      } else {
        let title = [];
        let text = [];
        console.log(docCounter);
        for (let i = 0; i < docCounter; i++) {
          title.push(doc[i].title);
          text.push(doc[i].text);
        }
        console.log(title);
        console.log(text);
      }
    });
  }
}
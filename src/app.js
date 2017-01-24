/**
 * An Inverted Index Utility class
 * @class
 */
class InvertedIndexUtility {
  /**
   * class constructor
   * @constructor
   **/
  constructor() {
    this.content = '';
    this.icon = '';
  }
   /**
   * Function validateFile to
   * validate if file input
   * is a json file
   *
   */
  validateFile() {
    const filename = document.getElementById('filename_id').value;
    const filepath = 'jasmine/' + filename;
    const selectFilename1 = document.getElementById('selectfilename1');
    const selectFilename2 = document.getElementById('selectfilename2');
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.text = filename;
    option2.text = filename;
    selectFilename1.add(option1);
    selectFilename2.add(option2);
    const extension = filename.split('.').pop();
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    const uploadInfoId = document.getElementById('uploadinfo_id');
    if (extension === 'json') {
      jQuery.getJSON(filepath, (book) => {
        const bookCounter = book.length;
        if (bookCounter > 0 && typeof book === 'object') {
          uploadInfoId.innerHTML = 'File uploaded successfully !';
          uploadInfoId.className = 'green-text text-darken-3';
          invertedClassObj.createIndex(book, filename);
        } else {
          alert('No json object found !');
        }
      });
    } else {
      uploadInfoId.innerHTML = 'Oops! Invalid file Input detected!';
      uploadInfoId.className = 'red-text text-darken-3';
    }
  }

  /**
   * Function displayToView
   * output result to html
   * @param:result {{object}}
   * @param: functionCallName {{string}}
   */
  displayToView(result, functionCallName) {
    this.content = "<table class='striped'>";
    this.icon = "<i class='material-icons'>done</i>";
    if (typeof result !== 'undefined') {
      this.content += '<tr><th>Word</th><th>Doc1</th><th>Doc2</th></tr>';
      for (let key in result) {
        //displays the token
        this.content += '<td>' + key + '</td>';
        //an array of tokens location in document
        let docLocation = result[key];
        if (docLocation.length === 1) {
          if (docLocation[0] === 0) {
            this.content += '<td>' + this.icon + '</td><td></td>';
          } else {
            this.content += '<td></td><td>' + this.icon + '</td>';
          }
          this.content += '</tr>';
        } else {
          this.content += '<td>' + this.icon + '</td><td>' + this.icon + '</td></tr>';
        }
      }
      this.content += "</table>";
      $('#' + functionCallName + 'indextable').append(this.content);
    }
  }
   /**
   * Function searchIndexTest to
   * validate if query input
   * is valid
   */
  searchIndexTest() {
    let searchQuery = document.getElementById('search').value;
    let jsonName = document.getElementById('selectfilename2').value;
    if (searchQuery === '' || jsonName === '') {
      alert('Empty Input Detected!');
    } else {
      invertedClassObj.searchIndex(searchQuery, jsonName);
    }
  }
}
// Create instance for InvertedIndexUtility
let validateobj = new InvertedIndexUtility();
//require('./inverted-index');

class InvertedIndexUtility {
  constructor() {

  }
  validateFile(files) {
    const filename = 'jasmine/' + document.getElementById('filename_id').value;
    const extension = filename.split('.').pop();
    document.getElementById('uploadinfo_panel').removeAttribute('hidden');
    let uploadInfoId = document.getElementById('uploadinfo_id');
    if (extension === 'json') {
      jQuery.getJSON(filename, (book) => {
        const bookCounter = book.length;
        if (bookCounter > 0 && typeof book === 'object') {
          uploadInfoId.innerHTML = 'File uploaded successfully !';
          uploadInfoId.className = 'green-text text-darken-3';
          let myinvertedindex = new InvertedIndex();
          myinvertedindex.createIndex(book);
        } else {
          alert('No json object found !');
        }
      });
    } else {
      uploadInfoId.innerHTML = 'Oops! Invalid file Input detected!';
      uploadInfoId.className = 'red-text text-darken-3';
    }
  }

  cleanWords(titleAndText) {
    console.log('title and text');
    return titleAndText.replace(/[^a-z\d\s]+/gi, ' ');
  }
  /**
   * Function removeMultipleWords to
   * remove multiple occurrences of
   * words
   */
  removeMultipleWords(words) {
    let uniqueWords = words.toLowerCase().split(' ').sort().filter((item, i, allItems) => i === allItems.indexOf(item))
      .join(' ');
    return uniqueWords;
  }
  displayToView(result) {
    let content = "<table class='striped'>";
    let icon ="<i class='material-icons'>done</i>";
    if (typeof result !== 'undefined') {
      content += '<tr><th>Word</th><th>Doc1</th><th>Doc2</th></tr>';
      for (let key in result) {
        content += '<td>' + key + '</td>'; //displays the token
        let docLocation = result[key]; //an array of tokens location in doc
        if (docLocation.length === 1) {
          if (docLocation[0] === 0) {
            content += '<td>' + icon + '</td><td></td>';
          } else {
            content += '<td></td><td>' + icon + '</td>';
          }
          content += '</tr>';
        } else {
          content += '<td>' + icon + '</td><td>' + icon + '</td></tr>';
        }
      }
      content += "</table>";
      $('#dynamictable').append(content);
    }
  }
}
let validateobj = new InvertedIndexUtility();
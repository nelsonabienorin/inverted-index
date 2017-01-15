/**
 * An Inverted Inverted Application
 */

class InvertedIndex {

/**
 * A function to validate uploaded file
 */
  static validateFile() {
    let filename = document.getElementById("filename_id").value;
    let extension = filename.split(".").pop();
    document.getElementById("uploadinfo_panel").removeAttribute("hidden");
    let uploadinfo_id = document.getElementById("uploadinfo_id");
    if (extension === "json") {
      uploadinfo_id.innerHTML="Your file uploaded successfully !"
      uploadinfo_id.className = "green-text text-darken-3";
    } else {
      uploadinfo_id.innerHTML="Ops! Invalid file detected!"
      uploadinfo_id.className = "red-text text-darken-3";
    }
  }

  readFile() {

  }

}
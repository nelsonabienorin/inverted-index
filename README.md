[![Build Status](https://travis-ci.org/andela-nrotimi/inverted-index.svg?branch=master)](https://travis-ci.org/andela-nrotimi/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-nrotimi/inverted-index/badge.svg?branch=feedback)](https://coveralls.io/github/andela-nrotimi/inverted-index?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-nrotimi/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-nrotimi/inverted-index)

# inverted-index
An inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

#### Features
- Accepts Upload of JSON file in below format.
```
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

```
- Creates Index of all objects with 'title' and 'text' keys in uploaded file.
- Allows Searching through the created index.

#### How to use
The Application is available:

- Access the application via https://nrotimi-inverted-index.herokuapp.com

- And on any local machine after the following steps:
    ```
    git clone https://github.com/andela-nrotimi/inverted-index.git
    ```

    * Navigate to the 'inverted-index' directory via your terminal

    * Install all the dependencies (you must have installed [Nodejs](nodejs.org)):

    ```
    npm install
    ```

    - Run Tests for the application with:

    ```
    npm test
    ```

  - Start the Application with:
  ```
    npm start
    ```

#### The application was built using the following Technologies and Services:
- Gulp
- Karma
- Jasmine
- Travis CI
- Coveralls
- Hound CI
- Materialise

#### Limitation of the application
The Application can not accept multiple upload at a time.

[![Build Status](https://travis-ci.org/andela-nrotimi/inverted-index.svg?branch=master)](https://travis-ci.org/andela-nrotimi/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-nrotimi/inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-nrotimi/inverted-index?branch=develop)

# inverted-index
An inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

#### Features
- Accepts Upload of JSON file in below format.
```
[
    {"title": "Sesame Street",
    "text":"Sesame Street was and still remains my personal favourite of all the Kids Televison I watched growing up. I find
    it really fun and most importantly Educative"
    },
    {"title": "Andela",
    "text": "Andela has one of the best work environments and culture that I've ever come accross If not the best. It really is a dream place to learn and work."
    }
]
```
- Creates Index of all objects with 'title' and 'text' keys in uploaded file.
- Allows Searching through the created index.

#### How to use
The Application is available:
- On the internet via [https://inverted-index-andela.com](https://inverted-index-andela.com/)
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

  - Access the application via https://nrotimi-inverted-index.herokuapp.com/


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

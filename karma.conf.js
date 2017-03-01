// Karma configuration
// Generated on Fri Jan 20 2017 15:08:39 GMT+0100 (WAT)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugin: [
      'karma-coverage',
      'karma-coveralls'
    ],

    // list of files / patterns to load in the browser
    files: [
      'src/inverted-index.js',
       'src/helper.js',
      // 'jasmine/spec/inverted-index-test.js',
      'jasmine/build/bundle.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    //https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/inverted-index.js': ['coverage'],
      'src/eventListener.js': ['coverage'],
      'src/invertedIndexUI.js': ['coverage'],
      'src/util.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls','spec-as-html'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable  disable watching file and executing tests
    // whenever any file changes

    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    customLaunchers: {
     Chrome_travis_ci: {
       base: 'Chrome',
       flags: ['--no-sandbox']
     }
   },

   // start these browsers depending on our enviroment
   browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
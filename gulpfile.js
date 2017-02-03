const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const karma = require('karma');
const path = require('path');
const browserSync = require('browser-sync').create();
// const BufferStreams = require('bufferstreams');
// const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 3000,
    ghostMode: false
  });
});


// const eslint = require('gulp-eslint');
// create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

// gulp.watch('src/javascript/*.js', ['eslint']);


// gulp.task('lint', function () {
//     return gulp.src(['**/*.js','!node_modules/**'])
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// });

// gulp.task('default', ['lint'], function () {
//     // This will only run if the lint task is successful...
// });

// configure which files to watch and what tasks to use on file changes
gulp.task('default', ['browserSync', 'watch', 'scripts', 'test', 'karma']);
// gulp.task('test', ['karma']);
gulp.task('watch', () => {
  // gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('.karma.conf.js', browserSync.reload);
  gulp.watch(['./src/*.js', './jasmine/spec/*.js'], browserSync.reload);
});

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
   .pipe(browserify())
   .pipe(rename('bundle.js'))
   .pipe(gulp.dest('jasmine/build'));
});

gulp.task('karma', (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

// gulp.task('scripts', () => {
//  gulp.src('src/inverted.js')
//    .pipe(browserify())
//    .pipe(rename('bundle.js'))
//    .pipe(gulp.dest('jasmine/classbuild'));
// });


// gulp.task('scripts', () => {
//  gulp.src('src/app.js')
//    .pipe(browserify())
//    .pipe(rename('bundle.js'))
//    .pipe(gulp.dest('jasmine/classbuild'));
// });
// gulp.task('jasmine', () => {
//   const filesForTest = ['./jasmine/spec/less/**/*'];
//     gulp.src(filesForTest)
//     .pipe(watch(filesForTest))
//     .pipe(jasmineBrowser.specRunner({ console: true }))
//     .pipe(jasmineBrowser.headless());
// });

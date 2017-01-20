const gulp = require('gulp');
const browserSync = require('browser-sync').create();
//const BufferStreams = require('bufferstreams');
//const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 3000,
    ghostMode: false
  });
});

//const eslint = require('gulp-eslint');
// create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

//gulp.watch('src/javascript/*.js', ['eslint']);


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
gulp.task('default', ['browserSync']);

gulp.task('watch', function () {
  //gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('.src/css/*.css', browserSync.reload);
  gulp.watch('src/index.html', browserSync.reload);
  //   gulp.watch(['./src/*.js', './jasmine/spec/*.js'], browserSync.reload);
});


// gulp.task('jasmine', () => {
//   const filesForTest = ['./jasmine/spec/less/**/*'];
//     gulp.src(filesForTest)
//     .pipe(watch(filesForTest))
//     .pipe(jasmineBrowser.specRunner({ console: true }))
//     .pipe(jasmineBrowser.headless());
// });
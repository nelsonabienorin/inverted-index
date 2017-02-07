
const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const karma = require('karma');
const path = require('path');
const browserSync = require('browser-sync').create();
const testBrowserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: process.env.PORT || 5000,
    ui: false,
    ghostMode: false
  });
});

gulp.task('watch', () => {
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('.karma.conf.js', browserSync.reload);
  gulp.watch(['./src/*.js', './jasmine/spec/*.js'], testBrowserSync.reload);
});

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
   .pipe(browserify())
   .pipe(rename('bundle.js'))
   .pipe(gulp.dest('jasmine/build'));
});

gulp.task('test', ['scripts'], () => {
  testBrowserSync.init({
    server: {
      baseDir: ['./jasmine', './src'],
      index: 'SpecRunner.html'
    },
    port: 3120,
    ui: false,
    ghostMode: false
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], testBrowserSync.reload);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('default', ['browserSync']);

gulp.task('development', ['browserSync', 'watch', 'scripts','test']);





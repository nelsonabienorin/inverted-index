const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const karma = require('karma');
const path = require('path');
const browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 3000,
    ghostMode: false
  });
});
// configure which files to watch and what tasks to use on file changes
gulp.task('default', ['browserSync', 'watch', 'scripts', 'karma']);
gulp.task('watch', () => {
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

gulp.task('test', (done) => {
  const karmaServer = new karma.Server({
    configFile: path.resolve('karma.conf.js'),
    browsers: ['Chrome']
  }, (exitCode) => {
    done();
    process.exit(exitCode);
  }).start();
});

gulp.task('test', () => {
  browserSync.init({
    server: {
      baseDir: ['./jasmine', './src'],
      port: 3120,
      index: 'SpecRunner.html'
    },
    ghostMode: false
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], browserSync.reload);
});


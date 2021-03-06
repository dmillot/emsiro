'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
   gulp.src('./public/stylesheets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/stylesheets/sass/*.scss', gulp.series('sass'));
});

gulp.task('sass:manual', function () {
  return gulp.src('./public/stylesheets/sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./public/stylesheets'));
});
'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const imageOptimization = require('gulp-image-optimization');

const clientScripts = ['app/**/*.js*'];
const staticFiles = ['app/**/*.html'];


gulp.task('static:dev', () => {
  gulp.src(staticFiles, { 'base': 'app' })
   .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', () => {
  gulp.src(clientScripts)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-1', 'react']
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('test', () => {
  return gulp.src('tests/*.js')
   .pipe(mocha())
   .once('end', function(){
  process.exit();
});
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/sass/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(sourcemaps.init())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(__dirname + '/build/css'));
});

gulp.task('default', ['static:dev', 'build:dev', 'sass:dev', 'test']);
// gulp.task('default', ['test']);

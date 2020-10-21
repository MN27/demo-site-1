const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

// webpackの設定ファイルの読み込み
const webpackConfig = require('./webpack.config');

const compileSass = () => {
  return src('./assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['defaults', 'last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/css'));
};

const cssMin = () => {
  return src('./assets/css/style.css')
    .pipe(cleancss())
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./assets/css'));
};

const jsMin = () => {
  return webpackStream(webpackConfig, webpack).pipe(dest('./assets/js'));
};

const imageMin = () => {
  return src('./assets/images/*.{jpg,jpeg,png,gif,svg}')
    .pipe(
      imagemin([
        pngquant('65-80'),
        mozjpeg({ quality: 80 }),
        imagemin.svgo(),
        imagemin.gifsicle(),
      ]),
    )
    .pipe(dest('./assets/images/min'));
};

const watchSassFiles = () => watch('./assets/sass/style.scss', compileSass);
exports.default = watchSassFiles;
exports.sass = series(compileSass, cssMin);
exports.build = series(compileSass, cssMin, jsMin, imageMin);
exports.js = jsMin;

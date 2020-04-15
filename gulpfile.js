const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat  = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

function compileSass() {
  return src('./assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(autoprefixer({
      "overrideBrowserslist": [
        "defaults",
        "last 2 versions"
      ],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/css'));
}

function cssMin() {
  return src('./assets/css/style.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./assets/css'));
}

function jsMin() {
  return src('./assets/js/_*.js')
    .pipe(babel({
      "presets": ["@babel/preset-env"]
    }))
    .pipe(concat('main.js'))
    .pipe(dest('./assets/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./assets/js'));
}

function imageMin() {
  return src('./assets/images/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin(
      [
        pngquant({ quality: '65-80', speed: 1 }),
        mozjpeg({ quality: 80 }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ]
    ))
    .pipe(dest('./assets/images/min'));
}

const watchSassFiles = () => watch('./assets/sass/style.scss', compileSass);
exports.default = watchSassFiles;
exports.sass = compileSass;
exports.build = series(cssMin, jsMin, imageMin);
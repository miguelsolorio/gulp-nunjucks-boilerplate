// Requires
var gulp = require('gulp');
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    cache = require('gulp-cache'),
    data = require('gulp-data'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    nunjucksRender = require('gulp-nunjucks-render');

// File paths
var basePath = {
  src  : 'src/',
  dest : 'public/'
};

var srcAssets = {
  styles  : basePath.src + 'css/',
  scripts : basePath.src + 'js/',
  images  : basePath.src + 'images/',
  root    : basePath.src,
  bower   : 'bower_components/',
};

var destAssets = {
  styles  : basePath.dest + 'css/',
  scripts : basePath.dest + 'js/',
  images  : basePath.dest + 'images/',
  root  : basePath.dest
};

var scriptFiles = [
  srcAssets.bower + 'jquery/dist/jquery.js',
  srcAssets.scripts + '**/*.js'
]

// Defaults
var isDev = true;
var isProd = false;

// Cmd line env
if(gutil.env.prod || gutil.env.production) {
  isDev  = false;
  isProd = true;
}

// Tasks
gulp.task('sass', function() {
  gulp.src(srcAssets.styles + 'main.scss')
    .pipe(sass())
    .pipe(gulpif(isProd, sass({ outputStyle: 'compressed' })))
    .pipe(gulp.dest(destAssets.styles))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("scripts", function () {
  gulp.src(scriptFiles)
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest(destAssets.scripts));

});

gulp.task('images', function() {
    return gulp.src(srcAssets.images + '**/*.+(png|jpg|gif|svg)')
      .pipe(gulpif(isProd, cache(imagemin({
        interlaced: true
      }))))
      .pipe(gulp.dest(destAssets.images))
});

gulp.task('clean', function() {
    return del.sync(destAssets.root);
});

gulp.task('clear cache', function(callback) {
    return cache.clearAll(callback);
});

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: destAssets.root
      },
    })
});

gulp.task('copy', function() {
    return gulp.src(srcAssets.images + '**/*.+(png|jpg|gif|svg)')
      .pipe(gulp.dest(destAssets.images))
});

// Template
gulp.task('template', function() {
  return gulp.src(srcAssets.root + 'template/pages/**/*.+(html|nunjucks|njk)')
  .pipe(data(function() {
    return require('./data.json')
  }))
  .pipe(nunjucksRender({
    path: [srcAssets.root + 'template/']
  }))
  .pipe(gulp.dest(destAssets.root))
});

// Watch
gulp.task('watch', ['browserSync', 'sass', 'template'], function() {
  gulp.watch(srcAssets.styles + '**/*.scss', ['sass']);
  gulp.watch(srcAssets.scripts + '**/*.js', ['scripts',browserSync.reload]);
  gulp.watch(srcAssets.root + '**/*.+(html|nunjucks|njk)', ['template', browserSync.reload]);
});

// Build
gulp.task('build', ['clean','clear cache', 'template','sass','images','scripts'], function() {
    console.log('###### => Building files');
});

// Dev
gulp.task('default', ['build', 'watch'], function() {
  console.log('###### => Development');
});
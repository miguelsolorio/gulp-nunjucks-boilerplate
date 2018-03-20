// Requires
var gulp = require('gulp');
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    cache = require('gulp-cache'),
    data = require('gulp-data'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    fs = require('fs'),
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
  fonts   : basePath.src + 'fonts/',
  root    : basePath.src,
  bower   : 'bower_components/',
  node    : 'node_modules/'
};

var destAssets = {
  styles  : basePath.dest + 'css/',
  scripts : basePath.dest + 'js/',
  images  : basePath.dest + 'images/',
  fonts  : basePath.dest + 'fonts/',
  root  : basePath.dest
};

var scriptFiles = [
  srcAssets.bower + 'jquery/dist/jquery.js',
  srcAssets.scripts + '**/*.js'
]

// Defaults
var isProd = false;

// Cmd line env
if(gutil.env.prod || gutil.env.production) {
  isProd = true;
}

// Tasks
gulp.task('styles', function() {
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
    return gulp.src(srcAssets.images + '**/*.+(png|jpg|gif)')
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

gulp.task('copyWatch', function() {
    return gulp.src(srcAssets.images + '**/*.+(png|jpg|gif|svg)')
      .pipe(gulp.dest(destAssets.images))
});

gulp.task('copy', function() {
    return gulp.src(srcAssets.images + '**/*.+(woff|woff2|ttf|svg)')
      .pipe(gulp.dest(destAssets.images))
});

// Template
gulp.task('template', function() {
  return gulp.src(srcAssets.root + 'template/pages/**/*.+(html|nunjucks|njk)')
  .pipe(data(function(file) {
    return JSON.parse(fs.readFileSync('./navigation.json'));
   }))
  .pipe(nunjucksRender({
    path: [srcAssets.root + 'template/']
  }))
  .pipe(gulp.dest(destAssets.root))
});

// TODO: Find a better way to do this
gulp.task('setProd', function() {
  console.log('############ =========> Building files for Production');
  isProd = true;
});

// Watch
gulp.task('watch', ['browserSync', 'styles', 'template', 'copyWatch'], function() {
  gulp.watch(srcAssets.images + '**/*.+(png|jpg|gif|svg)', ['copyWatch']);
  gulp.watch(srcAssets.styles + '**/*.+(scss|sass|css)', ['styles']);
  gulp.watch(srcAssets.scripts + '**/*.js', ['scripts',browserSync.reload]);
  gulp.watch(srcAssets.root + '**/*.+(html|nunjucks|njk)', ['template', browserSync.reload]);
  gulp.watch('navigation.json', ['template', browserSync.reload]);
});

// Default
gulp.task('default', ['clean','clear cache','template','styles','images','scripts','copyWatch','watch'], function() {
  console.log('############ =========> Development');
});

// Development
gulp.task('build', ['default']);

// Production
gulp.task('production', gulpSequence(['setProd'], 'clean','clear cache', 'template','styles','images','scripts','copy'));
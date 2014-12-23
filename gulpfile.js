/*!
 * gulp
 * http://markgoodyear.com/2014/01/getting-started-with-gulp/
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
//	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	del = require('del');

// Styles
gulp.task('styles', function () {
	return gulp.src('src/styles/main.scss')
		.pipe(sass({style: 'expanded',}))
		//.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/styles'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(minifycss())
		//.pipe(gulp.dest('dist/styles'))
		.pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
	return gulp.src('src/scripts/**/*.js')
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))
		//.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts'))
		//.pipe(rename({suffix: '.min'}))
		//.pipe(uglify())
		//.pipe(gulp.dest('dist/scripts'))
		.pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
	return gulp.src('src/images/**/*')
		.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
		.pipe(gulp.dest('dist/images'))
		.pipe(notify({message: 'Images task complete'}));
});

// Images
gulp.task('pages', function () {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(notify({message: 'Pages task complete'}));
});

// Clean
gulp.task('clean', function (cb) {
	del(['dist/scripts', 'dist/styles', 'dist/images'], cb)
});

// Default task
gulp.task('default', ['clean'], function () {
	gulp.start('styles', 'scripts', 'images', 'pages', 'watch');
});

// Watch
gulp.task('watch', function () {
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('src/**/*.html', ['pages']);
});

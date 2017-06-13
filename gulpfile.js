var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

//Copy PHP Files
gulp.task('php', function() {
	gulp.src('src/**/*.php')
	.pipe(gulp.dest('dest'))
	.pipe(livereload())
});

//Copy Images
gulp.task('images', function() {
	gulp.src('src/**/*.{png,gif,jpg,jpeg}')
	.pipe(gulp.dest('dest/assets/images'))
	.pipe(livereload())
});

//Dev SCSS
gulp.task('dev-scss', function() {
	gulp.src('src/assets/scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-normalize-scss').includePaths,
		outputStyle: 'expanded'
	}))
		.on('error', gutil.log)
	.pipe(sourcemaps.write())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dest'))
	.pipe(livereload())
});

//Prod SCSS
gulp.task('prod-scss', function() {
	gulp.src('src/assets/scss/style.scss')
	.pipe(sass({
		includePaths: require('node-normalize-scss').includePaths,
		outputStyle: 'compressed'
	}))
		.on('error', gutil.log)
	.pipe(autoprefixer())
	.pipe(gulp.dest('dest'))
});

//Dev JS
gulp.task('dev-js', function() {
	gulp.src('src/assets/js/**/*.js')
	.pipe(sourcemaps.init())
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dest/assets/js'))
});

//Prod JS
gulp.task('prod-js', function() {
	gulp.src('src/assets/js/**/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dest/assets/js'))
});

//Log
gulp.task('log', function() {
	gutil.log('== My Log Task ==')
});

//Watch
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/**/*.php', ['php']);
	gulp.watch('src/**/*.{png,gif,jpg,jpeg}', ['images']);
	gulp.watch('src/assets/scss/**/*.scss', ['dev-scss']);
	gulp.watch('src/assets/js/**/*.js', ['dev-js']);
});

gulp.task('dev', ['php', 'images', 'dev-scss', 'dev-js', 'watch']);

gulp.task('prod', ['php', 'images', 'prod-scss', 'prod-js']);
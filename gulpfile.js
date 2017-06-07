var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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
});

gulp.task('dev', ['php', 'images', 'dev-scss', 'watch']);

gulp.task('prod', ['php', 'images', 'prod-scss']);
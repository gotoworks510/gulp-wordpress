'use strict';
var gulp = require('gulp'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require("gulp-plumber"),
	webserver = require('gulp-webserver');

// Directory
var dir = {
	current: 'htdocs',
	css: 'htdocs/wp-content/themes/senna',
	sass: 'sass',
};

// Typing "gulp" on the command line let all tasks run
gulp.task('default', ['webserver', 'watch', 'compass']);

gulp.task('webserver', function() {
	gulp.src(dir.current)
		.pipe(webserver({
		host: 'localhost',
		port: 9002,
		livereload: true,
		open: true
	}));
});

// Call compass
gulp.task('compass', function() {
	gulp.src(dir.sass + '/*.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: 'config.rb',
		css: dir.css,
		sass: dir.sass
	}))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest(dir.css));
});

/// Watch
gulp.task('watch', function() {
	gulp.watch(dir.sass + '/*.scss',['compass']);
});

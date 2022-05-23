var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var prefix = require('autoprefixer-stylus');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

gulp.task('css', function() {
	return gulp.src('./src/puf.styl')
		.pipe(stylus({
			use: prefix()
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', function() {
 	return gulp.src('./dist/puf.css')
		.pipe(concatCss("puf.min.css"))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        host: "localhost",
        open: false,
        notify: false,
		port:8000
    });

    gulp.watch("./src/**/*.styl", ['css']);
	gulp.watch("./dist/puf.css", ['minify-css']);
    gulp.watch(["./dist/*.html","./dist/*.css"]).on('change', browserSync.reload);
});


gulp.task('default', ['css', 'minify-css', 'serve']);

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var babelify = require('babelify');
var util = require('gulp-util');
var brfs = require('brfs');
var gulp = require('gulp');

gulp.task('demo', function() {
    var bundler = browserify('./demo/index.js', {
        debug: global.debug,
        entry: true,
        transform: [babelify, brfs]
    });

    function bundle() {
        return bundler.bundle()
            .on('error', util.log.bind(util, 'Browserify Error'))
            .pipe(source('demo.js'))
            .pipe(buffer())
            .pipe(global.debug ? util.noop() : uglify())
            .pipe(gulp.dest('dist'));
    }

    if (global.debug) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
        bundler.on('time', function(time) {
            util.log('Demo app rebundled in ' + time + ' ms');
        });
    }

    return bundle();
});
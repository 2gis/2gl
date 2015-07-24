var source = require('vinyl-source-stream');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var babelify = require('babelify');
var stringify = require('stringify');
var util = require('gulp-util');
var gulp = require('gulp');

gulp.task('js', function() {
    var bundler = browserify('./src/index.js', {
        debug: global.debug,
        entry: true,
        transform: [stringify(['.vert', '.frag', '.glsl']), babelify]
    });

    function bundle() {
        return bundler.bundle()
            .on('error', util.log.bind(util, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(global.debug ? util.noop() : uglify())
            .pipe(gulp.dest('dist'));
    }

    if (global.debug) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
        bundler.on('time', function(time) {
            util.log('App rebundled in ' + time + ' ms');
        });
    }

    return bundle();
});

var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('dev', function(cb) {
    global.debug = true;

    runSequence(['js', 'demo'], cb);
});

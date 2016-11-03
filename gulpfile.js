var gulp = require('gulp');
var concat = require('gulp-concat');
var umd = require('gulp-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var pump = require('pump');

var src = [
    'src/extend.js',
    'src/merge.js',
    'src/config.js',
    'src/scroller.js',
    'src/events.js',
    'src/viewport.js',
    'src/section.js',
    'src/swinch.js'
];

gulp.task('default', function compile(callback) {
    pump([
        gulp.src(src),
        concat('swinch.js'),
        insert.prepend("'use strict';\n\n"),
        umd({
            exports: function exports(file) {
                return 'swinch';
            },
            namespace: function namespace(file) {
                return 'swinch';
            }
        }),
        gulp.dest('dist'),
        uglify(),
        rename({extname: '.min.js'}),
        gulp.dest('dist')
    ], callback);
});

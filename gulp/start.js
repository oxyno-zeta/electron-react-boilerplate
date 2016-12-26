/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 25/12/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const runSequence = require('run-sequence');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('start:prod', done => runSequence('env:prod', 'clean:web:prod', 'web:build:prod', 'electron:start', done));

gulp.task('start:dev', done => runSequence('env:dev', 'clean:web:dev', 'web:build:dev', 'electron:start', done));

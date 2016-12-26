/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/08/16
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

gulp.task('release',
    done => runSequence('clean:release:dist:version', 'build:prod', 'electron:release', done));

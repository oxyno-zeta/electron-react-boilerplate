/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const del = require('del');

const packageJson = require('../package.json');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('clean:web:dev', () => del('views'));

gulp.task('clean:web:prod', () => del('views'));

gulp.task('clean:release:dist', () => del('dist'));

gulp.task('clean:release:dist:version', () => del(`dist/*/${packageJson.version}/`));

gulp.task('clean:release:tmp', () => del('.tmp'));

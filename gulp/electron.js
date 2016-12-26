/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const electronPrebuilt = require('electron-prebuilt');
const psTree = require('ps-tree');
const { spawn } = require('child_process');
const electronBuilder = require('electron-builder');
const runSequence = require('run-sequence');

const packageJson = require('../package.json');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('electron:release',
    done => runSequence('electron:release:windows', 'electron:release:linux', 'electron:release:mac', done));

gulp.task('electron:release:windows',
    done => runSequence('clean:release:tmp', 'electron:release:windows:build', 'electron:release:windows:move', done));

gulp.task('electron:release:windows:move', () => (
    gulp.src('.tmp/**/*')
        .pipe(gulp.dest(`dist/windows/${packageJson.version}/`))
));

gulp.task('electron:release:windows:build', (done) => {
    // Promise is returned
    electronBuilder
        .build({
            platform: [electronBuilder.Platform.WINDOWS],
            config: packageJson.build,
        })
        .then(() => {
            done();
        })
        .catch(done);
});

gulp.task('electron:release:mac',
    done => runSequence('clean:release:tmp', 'electron:release:mac:build', 'electron:release:mac:move', done));

gulp.task('electron:release:mac:move', () => (
    gulp.src(['.tmp/**/*', '!.tmp/**/*.app/', '!.tmp/**/*.app/**/*'])
        .pipe(gulp.dest(`dist/mac/${packageJson.version}/`))
));

gulp.task('electron:release:mac:build', (done) => {
    // Promise is returned
    electronBuilder
        .build({
            platform: [electronBuilder.Platform.MAC],
            config: packageJson.build,
        })
        .then(() => {
            done();
        })
        .catch(done);
});

gulp.task('electron:release:linux',
    done => runSequence('clean:release:tmp', 'electron:release:linux:build', 'electron:release:linux:move', done));

gulp.task('electron:release:linux:move', () => (
    gulp.src('.tmp/**/*')
        .pipe(gulp.dest(`dist/linux/${packageJson.version}/`))
));

gulp.task('electron:release:linux:build', (done) => {
    // Promise is returned
    electronBuilder
        .build({
            platform: [electronBuilder.Platform.LINUX],
            config: packageJson.build,
        })
        .then(() => {
            done();
        })
        .catch(done);
});

gulp.task('electron:start', (done) => {
    const options = {
        shell: true,
        env: process.env,
        stdio: 'inherit',
    };

    const child = spawn(electronPrebuilt, ['app/'], options);
    child.on('close', code => process.exit(code));
    child.on('error', done);
});

gulp.task('electron:serve', (done) => {
    const options = {
        shell: true,
        env: process.env,
        stdio: 'inherit',
        detached: true,
    };

    let child = spawn(electronPrebuilt, ['app/'], options);
    child.on('error', console.error);
    child.on('exit', () => {
        child = null;
    });
    gulp.watch(['app/**/*', '!app/views', '!app/views/**/*', '!app/dev', '!app/dev/**/*'], (event) => {
        console.log(`File ${event.path} was ${event.type}, reloading app...`);
        const cb = () => {
            child = spawn(electronPrebuilt, ['app/'], options);
            child.on('error', console.error);
            child.on('exit', () => {
                child = null;
            });
        };

        if (child) {
            child.on('exit', cb);
            psTree(child.pid, (err, children) => {
                if (err) {
                    done(err);
                    return;
                }

                children.map(item => process.kill(item.PID, 'SIGKILL'));
                process.kill(child.pid, 'SIGKILL');
            });
        } else {
            cb();
        }
    });

    const onKillCb = () => {
        if (child) {
            psTree(child.pid, (err, children) => {
                if (err) {
                    done(err);
                    return;
                }

                children.map(item => process.kill(item.PID, 'SIGKILL'));
                process.kill(child.pid, 'SIGKILL');
                process.exit();
            });
        } else {
            process.exit();
        }
    };
    process.on('SIGINT', onKillCb);

    done();
});


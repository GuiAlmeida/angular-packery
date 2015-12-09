'use strict';

import config        from '../config';
import gulp          from 'gulp';
import browserSync   from 'browser-sync';
import babel         from 'gulp-babel';
import ngAnnotate    from 'gulp-ng-annotate';
import concat        from 'gulp-concat';

gulp.task('babel', function () {
    gulp.src([config.scripts.src])
        .pipe(babel({
            modules: 'common'
        }))
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(browserSync.stream({once: true}));
});

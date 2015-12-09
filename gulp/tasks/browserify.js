'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import ngAnnotate   from 'browserify-ngannotate';

function buildScript(file) {

    var bundler = browserify({
        entries: [config.sourceDir + file],
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: !global.isProd,
    });

    if (!global.isProd) {
        bundler = watchify(bundler);

        bundler.on('update', () => {
            rebundle();
            gutil.log('Rebundle...');
        });
    }

    const transforms = [
        {'name': babelify, 'options': {}},
        {'name': ngAnnotate, 'options': {}},
        {'name': 'brfs', 'options': {}}
    ];

    transforms.forEach((transform) => {
        bundler.transform(transform.name, transform.options);
    });

    function rebundle() {
        const stream = bundler.bundle();
        const createSourcemap = global.isProd && config.browserify.prodSourcemap;

        return stream.on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulpif(createSourcemap, buffer()))
            .pipe(gulpif(createSourcemap, sourcemaps.init()))
            .pipe(gulpif(global.isProd, streamify(uglify({
                mangle: false,
                compress: {drop_console: true}
            }))))
            .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(browserSync.stream({once: true}));
    }

    return rebundle();

}

gulp.task('browserify', function () {

    return buildScript('angular-packery.js');

});

'use strict';

//var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

module.exports = function (config) {

    config.set({

        basePath: '../',
        frameworks: ['mocha', 'sinon-chai', 'chai', 'browserify'],
        preprocessors: {
            'app/js/**/*.js': ['browserify', 'coverage']
        },
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            instrumenters: {isparta: isparta},
            instrumenter: {'app/js.**/*.js': 'isparta'},
            reporters: [
                {type: 'text-summary'},
                {type: 'html', dir: 'coverage/'}
            ],
            instrumenterOptions: {
                istanbul: {noCompact: true}
            }
        },

        autoWatch: true,

        browserify: {
            debug: true,
            extensions: ['.js', '.jsx'],
            transform: [
                ['babelify', {presets: ['es2015']}],
                'brfs',
                'bulkify',
                //istanbul({
                //    instrumenter: isparta,
                //    ignore: ['**/node_modules/**', '**/test/**']
                //})
            ]
        },

        //proxies: {
        //    '/': 'http://localhost:9876/'
        //},
        //
        //urlRoot: '/__karma__/',

        files: [
            // app-specific code
            'app/js/app.js',

            // 3rd-party resources
            'node_modules/angular-mocks/angular-mocks.js',

            // test files
            'test/unit/**/*.js'
        ],

        singleRun: false

    });

};

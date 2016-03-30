// Karma configuration
// Generated on Mon Jul 06 2015 16:29:41 GMT+0300 (MSK)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            //'../dist/fast-react.js',
            './helper.js',
            './**.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            //'*.js': ['webpack', 'sourcemap']
        },

       /* plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            require("karma-webpack"),
            require("karma-sourcemap-loader"),
            //require("karma-source-map-support")
        ],
*/
       /* webpack: {
            /!*module: {
             loaders: [
             {
             test: /\.js$/,
             loader: 'babel',
             query: {
             stage: 0,
             loose: ["es6.classes"]
             }
             }
             ]
             },*!/
            devtool: 'inline-source-map',
            //devtool: 'source-map',
        },*/


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}

var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: path.join(__dirname, './'),
    entry: './fragments/example2.js',
    output: {
        path: './fragments/',
        filename: 'dist.js'
    },

    module: {
        postLoaders: [
            {
                test: /\.js$/,
                loader: './other/parser/1.js'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    stage: 0,
                    loose: ["es6.classes"],
                    blacklist: ["react"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts']
    },
    devtool: 'inline-source-map',
};

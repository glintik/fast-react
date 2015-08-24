var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: path.join(__dirname, './'),
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loader: './postloader'
            }
        ]
    },
    devtool: 'inline-source-map'
};

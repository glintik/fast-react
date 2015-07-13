//var path = require('path');
var webpack = require('webpack');
module.exports = {
    //context: path.join(__dirname, './'),
    entry: './index',
    output: {
        path: './dist/',
        filename: 'fast-react.js'
    },

    module: {
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
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
};

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
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-fast-react',
                query: {
                    stage: 0,
                    loose: ["es6.classes"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts']
    },
    devtool: 'inline-source-map',
};

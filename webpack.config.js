var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: path.join(__dirname, './'),
    entry: './index.ts',
    output: {
        path: './dist/',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?module=common',
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts']
    },
    devtool: 'inline-source-map',
};

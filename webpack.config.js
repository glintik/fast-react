//var path = require('path');
var webpack = require('webpack');
module.exports = {
    //context: path.join(__dirname, './'),
    entry: './index.ts',
    output: {
        path: './dist/',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader?module=commonjs&tsconfig=./ts/tsconfig.json',
            },
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
        extensions: ['', '.js', '.jsx', '.ts']
    },
    devtool: 'inline-source-map',
};

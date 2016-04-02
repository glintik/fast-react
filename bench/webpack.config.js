"use strict";

const webpack = require('webpack');
module.exports = {
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/built/',
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2015-loose', 'react'],
                    plugins: ["babel-fast-react"],
                    // plugins: [/*"transform-react-inline-elements", */"transform-react-constant-elements"],
                }
            }

        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            react: '../fast-react',
            'react-dom': '../fast-react',
            'babel-fast-react': '../babel-fast-react'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool: 'source-map'
};

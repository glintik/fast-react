var webpack = require('webpack');
module.exports = {
    entry: './index',
    output: {
        path: './',
        filename: './dist/index.js'
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
    devtool: 'inline-source-map'
};

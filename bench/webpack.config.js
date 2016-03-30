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
                    stage: 0,
                    // plugins: ["babel-fast-react:after"],
                    loose: ["all"],
                    optional: ['runtime']
                }
            }

        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            react: '../fast-react',
            'react-dom': '../fast-react'
        }
    },
    devtool: 'source-map'
};

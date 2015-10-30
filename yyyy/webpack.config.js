module.exports = {
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/built/',
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: require.resolve('react'),
                loader: 'fast-react-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    stage: 0,
                    plugins: ["babel-fast-react:after"],
                    loose: ["all"],
                    optional: ['runtime']
                }
            }

        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
};

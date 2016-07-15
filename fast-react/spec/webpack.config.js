module.exports = {
    entry: __dirname + '/index.spec.js',
    context: '',
    output: {
        path: __dirname + '/built/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', "stage-0", 'react']
                }
            }
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    resolve: {
        alias: {
            react: 'fast-react',
            'react-dom': 'fast-react'
        }
    },
    //devtool: 'inline-source-map',
    devtool: 'inline-source-map'
    //devtool: 'source-map',
}
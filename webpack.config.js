const path = require('path');

module.exports = {
    mode: 'development',
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, 'frontend/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: './frontend/public',
    },
};

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
                test: /\.(js|jsx)$/, // Regra para arquivos JavaScript e JSX
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Regra para arquivos CSS
                use: ['style-loader', 'css-loader'], // Adiciona os loaders para processar o CSS
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
        static: './frontend/public',
        port: 3000, // Define a porta para o servidor
    },
};

const express = require("express");
const path = require('path');
const htmlWebpack = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: ["@babel/polyfill", './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        open: true,
        hot: true,
        https: true,
        before: function (app) {
            app.use(express.static(path.join(__dirname, "./assets")));
        }
    },
    devtool: "cheap-module-eval-source-map",
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new htmlWebpack({
            template: './src/index.html',
        }),
    ].filter(Boolean),
};

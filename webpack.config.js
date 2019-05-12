/* eslint-disable camelcase */
const webpack = require('webpack');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const firebaseConfig = require('./firebase-config');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            navigateFallback: '/index.html',
            runtimeCaching: [{
                urlPattern: new RegExp(`^${firebaseConfig.databaseURL}`),
                handler: 'cacheFirst',
                options: {
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            }]
        }),
        new WebpackPwaManifest({
            name: 'Food Me',
            short_name: 'Food Me',
            start_url: '.',
            display: 'fullscreen',
            theme_color: '#4aa0d5',
            background_color: '#f4f4f4',
            icons: [
                {
                    src: path.resolve('src/assets/favicon.ico'),
                    sizes: [16, 24, 32, 64]
                },
                {
                    src: path.resolve('src/assets/favicon.png'),
                    sizes: [192, 512]
                }
            ]
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devTool: 'cheap-module-eval-source-map'
};

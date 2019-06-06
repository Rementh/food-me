/* eslint-disable camelcase */
const webpack = require('webpack');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
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
            name: 'Food Me Up!',
            short_name: 'Food Me Up!',
            start_url: '.',
            display: 'standalone',
            theme_color: '#444',
            background_color: '#444',
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
        historyApiFallback: true,
        hot: true
    },
    devtool: 'cheap-module-eval-source-map'
};

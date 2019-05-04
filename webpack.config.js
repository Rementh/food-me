const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'public' }
        ]),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            navigateFallback: '/index.html',
            runtimeCaching: [{
                // To match cross-origin requests, use a RegExp that matches
                // the start of the origin:
                urlPattern: new RegExp('^https://food-me-app.firebaseio.com/'),
                handler: 'cacheFirst',
                options: {
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            }]
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};

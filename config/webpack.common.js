const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('stylesheets/[name].css');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname, '../src/entry/index.js')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[chunkhash].js",
        publicPath: "/",
        chunkFilename: "js/[name].[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test:/\.js/,
                include: path.resolve(__dirname, '../src'),
                use: ['eslint-loader']
            },
            {
                test: /\.js/,
                use: 'babel-loader',
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader:'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }, 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|bmp|eot|wof|woff2|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: 'imgs/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public'),
                to: path.resolve(__dirname, '../dist'),
                ignore: /\.html/
            }
        ]),
        extractSass
    ],
    optimization:{
        splitChunks:{
            chunks: 'all',
            minSize: 300,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
};
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'js/[name].[hash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port:9000,
        historyApiFallback:true,
        hot:true,
        proxy:{
            '/api/*': {
                target: "",
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            },
            '/oauth/*': {
                target: "",
                changeOrigin: true,
            },
            '/wx/*' : {
                target: ' https://apis.map.qq.com/',
                changeOrigin: true,
                pathRewrite: {'^/wx' : ''},
            },
            '/logout/*' : {
                target: "",
                changeOrigin: true,
                pathRewrite: { '^/logout' : ''}
            },
            '/getConfig/*' : {
                target: 'http://localhost:8080/',
            },
            '/download/*' : {
                target: 'http://10.1.80.220:8085/',
                changeOrigin: true,
                pathRewrite: { '^/download' : ''}
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
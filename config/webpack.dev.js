const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const domain = require('./domainConfig');
module.exports = merge(common, {
    mode:"development",
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        port: 9000,
        historyApiFallback: true,
        hot: true,
        proxy:{
            '/app/*': {
                target: domain[domain.environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/app' : ''}
            },
            '/goods/*': {
                target: 'http://192.168.1.152:8081/',
                changeOrigin: true,
                pathRewrite: {'^/goods' : ''}
            },
            '/store/*': {
                target: 'http://192.168.1.152:8082/',
                changeOrigin: true,
                pathRewrite: {'^/store' : ''}
            },
            '/node/*': {
                target: 'http://localhost:9191/',
                changeOrigin: true,
                pathRewrite: {'^/node' : ''}
            },
            '/auth/*': {
                target: domain[domain.environmental].auth,
                changeOrigin: true,
                pathRewrite: {'^/auth' : ''}
            },
            '/soap/*': {
                target: 'http://localhost:8887/',
                changeOrigin: true,
                pathRewrite: {'^/soap' : ''}
            },
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
});

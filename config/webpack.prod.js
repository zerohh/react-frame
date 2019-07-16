const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode:"production",
    devtool:"inline-source-map",
    plugins:[
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*'],
            cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.csss$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: {removeAll: true}},
            canPrint: true
        }),
        new UglifyWebpackPlugin({
            include:path.resolve(__dirname, '../src')
        })
    ]
});

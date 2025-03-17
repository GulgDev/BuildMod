const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".js"],
        modules: [`...`, path.resolve(__dirname, "./src")]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new JsonMinimizerPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: "static" }]
        }),
        new ZipPlugin({
            filename: "BuildMod.zip"
        })
    ]
};
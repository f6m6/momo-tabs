"use strict";

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const path = require("path");
const baseWebpackConfig = require("./webpack.config");
var nodeExternals = require('webpack-node-externals');

module.exports = Object.assign({}, baseWebpackConfig, {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        app: [
            path.resolve(__dirname, "src/serverApp.tsx"),
            // path.resolve(__dirname, "src/app.less"),
        ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'functions'),
        libraryTarget: 'commonjs2',
        publicPath: "/",
    },
    plugins: [
        ...baseWebpackConfig.plugins,
        new WebpackBuildNotifierPlugin({
            title: "Momo Tabs Build - Server",
        }),
        new CopyWebpackPlugin([ "package.json", "./src/index.template.html" ]),
        new webpack.DefinePlugin({
              __SERVER__: true
        })
    ],
});

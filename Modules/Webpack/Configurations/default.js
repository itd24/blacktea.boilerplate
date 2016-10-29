'use strict';
var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    _ = require("lodash"),
    configmanager = require("blacktea.configmanager");

var rootPath = configmanager.get("common", "rootPath");
var appsPath = configmanager.get("common", "appPath");
var distPath = path.resolve(appsPath,"dist");

module.exports = {
    context: appsPath,
    entry: "./src/entry.js",
    devtool: 'source-map',
    watch: false,
    output: {
        "path": distPath,
        "filename": "[name].min.js"
    },
    /*
    externals: {
        'jquery': 'jquery',
        'LinkBrowser': 'TYPO3/CMS/Recordlist/LinkBrowser'
    },
    //*/
    module: {
        loaders: [
            require("../Library/Loaders/CSS"),
            require("../Library/Loaders/Sass"),
            require("../Library/Loaders/Fonts"),
        ]
    },
    plugins: [
        new CleanWebpackPlugin([distPath], {
            root: rootPath
        }),
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("[name].min.css")
    ]
};
import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import _ from 'lodash';
import configmanager from 'blacktea.configmanager';

import CSSLoader from '../Library/Loaders/CSS';
import SassLoader from '../Library/Loaders/Sass';
import FontsLoader from '../Library/Loaders/Fonts';

var rootPath = configmanager.get("common", "rootPath"),
appsPath = configmanager.get("common", "appPath"),
distPath = path.resolve(appsPath,"dist","assets");

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
            CSSLoader,SassLoader,FontsLoader
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
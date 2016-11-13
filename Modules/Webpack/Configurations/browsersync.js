import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import _ from 'lodash';
import configmanager from 'blacktea.configmanager';

import CSSLoader from '../Library/Loaders/CSS';
import SassLoader from '../Library/Loaders/Sass';
import FontsLoader from '../Library/Loaders/Fonts';
import BabelLoader from '../Library/Loaders/Babel';

var rootPath = configmanager.get("common", "rootPath"),
    appsPath = configmanager.get("common", "appPath"),
    relativePath = configmanager.get("common", "publicPath"),
    distPath = path.resolve(appsPath, "dist", "assets"),
    publicPath = relativePath+"/dist/assets";
    console.log(publicPath);
module.exports = {
    context: appsPath,
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            "./src/entry.js"
        ]
    },
    devtool: 'source-map',
    watch: false,
    output: {
        path: "/",
        publicPath:publicPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            CSSLoader(false), SassLoader(false), FontsLoader, BabelLoader
        ]
    },
    plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ],
    target:"web"
};
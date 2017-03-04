import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import _ from 'lodash';
import configmanager from 'blacktea.configmanager';

import CSSLoader from '../Library/Loaders/CSS';
import SassLoader from '../Library/Loaders/Sass';
import FontLoaders from '../Library/Loaders/Fonts';
import BabelLoader from '../Library/Loaders/Babel';
import TypeScriptLoader from '../Library/Loaders/TypeScript';

var rootPath = configmanager.get("common", "rootPath"),
    appsPath = configmanager.get("common", "appPath"),
    relativePath = configmanager.get("common", "publicPath"),
    distPath = path.resolve(appsPath, "dist", "assets"),
    publicPath = relativePath+"/dist/assets";
module.exports = {
    context: appsPath,
    entry: {
        app: [
            "./src/entry.js"
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    watch: false,
    output: {
        path: distPath,
        publicPath:"/assets/",
        filename: "[name].min.js"
    },
    module: {
        loaders: [
            CSSLoader(true), 
            SassLoader(true),             
            FontLoaders.woff,
            FontLoaders.woff2,
            FontLoaders.ttf,
            FontLoaders.eot,
            FontLoaders.svg,
            TypeScriptLoader, 
            BabelLoader
        ]
    },
    plugins: [
        new CleanWebpackPlugin([distPath], {
            root: rootPath
        }),
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("[name].min.css")
    ],
    postcss: function(webpack) {
        return [
          autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
        ]
      },
    sassLoader: {
        includePaths: [path.resolve(rootPath, "node_modules")]
      }
};
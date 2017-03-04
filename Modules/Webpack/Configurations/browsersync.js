import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import _ from 'lodash';
import configmanager from 'blacktea.configmanager';
import autoprefixer from 'autoprefixer'; 

import CSSLoader from '../Library/Loaders/CSS';
import SassLoader from '../Library/Loaders/Sass';
import FontLoaders from '../Library/Loaders/Fonts';
import BabelLoader from '../Library/Loaders/Babel';
import WebpackHotAcceptLoader from '../Library/Loaders/WebpackHotAccept';
import HtmlLoader from '../Library/Loaders/Html';
import VueJSLoader from '../Library/Loaders/VueJS';

var rootPath = configmanager.get("common", "rootPath"),
    appsPath = configmanager.get("common", "appPath"),
    relativePath = configmanager.get("common", "publicPath"),
    distPath = path.resolve(appsPath, "dist", "assets"),
    publicPath = relativePath + "/dist/assets";
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
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js'],        
        alias: {
            //'vue$': 'vue/dist/vue.common',
            //'jquery': 'jquery/dist/jquery'
        }
    },
    watch: false,
    output: {
        path: "/",
        publicPath: publicPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            CSSLoader(false),
            SassLoader(false),
            FontLoaders.woff,
            FontLoaders.woff2,
            FontLoaders.ttf,
            FontLoaders.eot,
            FontLoaders.svg,
            BabelLoader,
            WebpackHotAcceptLoader,
            HtmlLoader,
            VueJSLoader
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    target: "web",
    postcss: function(webpack) {
        return [
            autoprefixer({
                browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
            })
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(rootPath, "node_modules")]
    }
};
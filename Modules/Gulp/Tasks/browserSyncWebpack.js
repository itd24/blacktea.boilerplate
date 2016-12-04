import configmanager from 'blacktea.configmanager';
import _ from 'lodash';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import path from 'path';
import htmlreplace from 'gulp-html-replace';

module.exports = function(framework) {

	var appsPath = configmanager.get("common", "appPath"),
		relativePath = configmanager.get("common", "publicPath"),
		publicPath = relativePath + "/dist/assets";

	var configurationLoader = framework.modules.require("Webpack.ConfigurationLoader");
	var pubSub = framework.require("Common.Events");

	return {
		run: function(config, gulp, plugins) {

			var configurations = configurationLoader.loadUsedConfigurations(framework, "browsersync", config);
			var bundler = webpack(configurations);
			var instance;

			return function() {

				var browserSyncConfig = configmanager.get("Webpack/browsersync", "/");


				var initializationObject = {
					host: browserSyncConfig.host,
					port: browserSyncConfig.port,
					proxy: {
						'target': target,
						middleware: [
							webpackDevMiddleware(bundler, {
								publicPath: publicPath,
								stats: {
									colors: true
								}
							}),
							webpackHotMiddleware(bundler)
						]
					},
					//*/
				};

				if (!!port.proxy) {

					initializationObject.proxy = {
						target: port.proxy.target,
						middleware: [
							webpackDevMiddleware(bundler, {
								publicPath: publicPath,
								stats: {
									colors: true
								}
							}),
							webpackHotMiddleware(bundler)
						]
					};
				} else if (!!port.server) {
					initializationObject.server = {
						engine.baseDir = path.resolve(appsPath, "dist");
						middleware: [
							webpackDevMiddleware(bundler, {
								publicPath: publicPath,
								stats: {
									colors: true
								}
							}),
							webpackHotMiddleware(bundler)
						]
					};
				}

				instance = browserSync.init(initializationObject);

				pubSub.default.listen("triggerReload", function() {
					if (!!instance && !!instance.reload)
						instance.reload();
				});

			}
		}
	};
}
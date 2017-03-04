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
		publicPath = relativePath+"dist/assets",
		host = configmanager.get("Webpack/browsersync", "host"),
		port = configmanager.get("Webpack/browsersync", "port"),
		target = configmanager.get("Webpack/browsersync", "proxy/target"),
		useProxy = configmanager.get("Webpack/browsersync", "useProxy"),
		server = configmanager.get("Webpack/browsersync", "server");

	var configurationLoader = framework.modules.require("Webpack.ConfigurationLoader");
	var pubSub = framework.require("Common.Events");

	return {
		run: function(config, gulp, plugins) {

			var configurations = configurationLoader.loadUsedConfigurations(framework, "browsersync", config);

			var bundler = webpack(configurations[0]);
			var instance;

			return function() {

				var configuration = {
					host: host,
					port: port
				};

				var usedMiddleware = [
							webpackDevMiddleware(bundler, {
								publicPath: publicPath,
								stats: {
									colors: true
								}
							}),
							webpackHotMiddleware(bundler)
						];

				if(!!useProxy){
					configuration.proxy = {
						'target': target,
						middleware: usedMiddleware
					};
				}
				else{
					server.middleware = usedMiddleware;
					configuration.server = server;
				}

				instance = browserSync.init(configuration);

				pubSub.default.listen("triggerReload", function() {
					if (!!instance && !!instance.reload)
						instance.reload();
				});

			}
		}
	};
}

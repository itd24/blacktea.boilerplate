import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackDevServer from 'webpack-dev-server';
import browserSyncModule from 'browser-sync';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

var port = 8081;
var browserSyncPort = 3000;
var browserSyncInstanceName = "webpackBrowserSync";

module.exports = function(loadedWebpackConfigs, config, framework) {

	var pubSub = framework.require("Common.Events");

	return function(callback) { // the callback is never called. When it was called, there was an error using the webpack watch option

		//******************************************************************
		//**********************browsersync options*************************
		//******************************************************************
		var browserSync;
		var browserSyncOptions = {
			// browse to http://localhost:3000/ during development 
			host: 'localhost',
			port: browserSyncPort,
			proxy: `http://localhost:${port}/`
		};
		//we push the browser-sync plugin
		browserSync = new BrowserSyncPlugin(browserSyncOptions, {
			reload: false,
			name: browserSyncInstanceName
		});

		pubSub.default.listen("triggerReload", function() {
			console.log("ha, it works!!");
			var browserSyncInstance = browserSyncModule.get(browserSyncInstanceName);
			if (!!browserSyncInstance && !!browserSyncInstance.reload)
				browserSyncInstance.reload();
		});
		//******************************************************************
		//******************************************************************
		//******************************************************************
		loadedWebpackConfigs.forEach(function(wpConfig) {
			if (!wpConfig.plugins)
				wpConfig.plugins = [];
			wpConfig.plugins.push(browserSync);
		});

		var compiler = webpack(loadedWebpackConfigs);
		new webpackDevServer(compiler, {
			// server and middleware options
		}).listen(port, "localhost", function(err) {
			if (err) throw new gutil.PluginError("webpack-dev-server", err);
			// Server listening
			gutil.log("[webpack-dev-server]", `http://localhost:${port}/webpack-dev-server/index.html`);

			// keep the server alive or continue?
			// callback();
		});
	}
}
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackDevServer from 'webpack-dev-server';

var port = 8081;

module.exports = function(loadedWebpackConfigs) {
	return function(callback) { // the callback is never called. When it was called, there was an error using the webpack watch option
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
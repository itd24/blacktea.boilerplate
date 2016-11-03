import webpack from 'webpack';
import gutil from 'gulp-util';

module.exports = function(loadedWebpackConfigs,config,framework) {
	return function(callback) { // the callback is never called. When it was called, there was an error using the webpack watch option

		var handler = function(err, status) {
			if (err) throw new gutil.PluginError("webpack", err);
			gutil.log("[webpack]", status.toString({
				// output options
			}));
		};

		var compiler = webpack(loadedWebpackConfigs);
		compiler.watch({},handler);
	}
}
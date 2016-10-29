/**
 * webpack gulp task. Can be used for one time compile or watch
 */
var webpack = require('webpack');
var path = require('path');
var gutil = require('gulp-util');
var configManager = require("blacktea.configmanager");
var _ = require("lodash");

module.exports = function(framework) {
	return {
		/**
		 * creates the actual task
		 * @param  {object} config  the task configuration/options
		 * @param  {object} gulp    Gulp
		 * @param  {object} plugins the loaded gulp plugins
		 * @return {function}         the function to be used as a gulp task
		 */
		run: function(config, gulp, plugins) {
			config = config || {};
			var webpackConfigurations = configManager.get("Webpack/main", "usedConfigurations");
			if (!_.isArray(webpackConfigurations))
				webpackConfigurations = [webpackConfigurations];

			var loadedWebpackConfigs = [];
			for(var i in webpackConfigurations){
				var configuration = framework.modules.require("Webpack.Configurations."+webpackConfigurations[i]);
				webpackConfigurations = _.merge(configuration,config);
				loadedWebpackConfigs.push(configuration);
			}

			return function(callback) { // the callback is never called. When it was called, there was an error using the webpack watch option
				webpack(loadedWebpackConfigs, function(err, status) {
					if (err) throw new gutil.PluginError("webpack", err);
					gutil.log("[webpack]", status.toString({
						// output options
					}));
				});
			};
		}
	};
}
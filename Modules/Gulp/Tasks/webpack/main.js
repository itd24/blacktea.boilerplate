/**
 * webpack gulp task. Can be used for one time compile or watch
 */
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';
import configManager from 'blacktea.configmanager';
import _ from 'lodash';

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
			for (var i in webpackConfigurations) {
				var configuration = framework.modules.require("Webpack.Configurations." + webpackConfigurations[i]);
				webpackConfigurations = _.merge(configuration, config);
				loadedWebpackConfigs.push(configuration);
			}


			var task = 'webpack';
			if(!!config.task)
				task = config.task;
			return require(`./${task}`)(loadedWebpackConfigs,config,framework);
		}
	};
}
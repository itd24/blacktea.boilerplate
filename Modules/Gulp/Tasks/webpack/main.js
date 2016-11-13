/**
 * webpack gulp task. Can be used for one time compile or watch
 */
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';
import configManager from 'blacktea.configmanager';
import _ from 'lodash';

module.exports = function(framework) {

	var configurationLoader = framework.modules.require("Webpack.ConfigurationLoader");

	return {
		/**
		 * creates the actual task
		 * @param  {object} config  the task configuration/options
		 * @param  {object} gulp    Gulp
		 * @param  {object} plugins the loaded gulp plugins
		 * @return {function}         the function to be used as a gulp task
		 */
		run: function(config, gulp, plugins) {
			
			var configurations = configurationLoader.loadUsedConfigurations(framework,"default",config);

			var task = 'webpack';
			if(!!config.task)
				task = config.task;
			return require(`./${task}`)(configurations,config,framework);
		}
	};
}
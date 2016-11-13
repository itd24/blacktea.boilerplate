import configManager from 'blacktea.configmanager';
import _ from 'lodash';

module.exports = {
	loadConfiguration: function(framework, name, config) {
		config = config || {};
		var configuration = framework.modules.require("Webpack.Configurations." + name);
		configuration = _.merge(configuration, config);
		return configuration;
	},
	loadUsedConfigurations: function(framework, type, config) {
		type = type || "default";
		var webpackConfigurations = configManager.get("Webpack/main", "usedConfigurations/" + type);
		var configurations = [];
		if (!_.isArray(webpackConfigurations))
			webpackConfigurations = [webpackConfigurations];
		for (var i in webpackConfigurations) {
			var configuration = this.loadConfiguration(framework, webpackConfigurations[i], config);
			configurations.push(configuration);
		}
		return configurations;
	}
}
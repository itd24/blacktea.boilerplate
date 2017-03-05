import configManager from 'blacktea.configmanager';
import _ from 'lodash';
import path from 'path';
var clean = require('gulp-clean');

module.exports = function(framework) {
	var appPath = configManager.get("common", "appPath");
	var sourcePath = path.resolve(appPath, "dist");
	return {
		run: function(config, gulp, plugins) {
			return function() {
				return gulp.src(sourcePath)					
					.pipe(clean());
			}
		}
	};
}
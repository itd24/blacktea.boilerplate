import configManager from 'blacktea.configmanager';
import _ from 'lodash';
import path from 'path';
import jshint from 'gulp-jshint';

module.exports = function(framework) {
	var appPath = configManager.get("common", "appPath");
	var sourcePath = path.resolve(appPath, "src/js/*.js");
	return {
		run: function(config, gulp, plugins) {
			return function() {
				return gulp.src(sourcePath)
					.pipe(jshint())
					.pipe(jshint.reporter('jshint-stylish'));
			}
		}
	};
}
var configManager = require("blacktea.configmanager");
var _ = require("lodash");
var path = require("path");
var jshint = require("gulp-jshint");

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
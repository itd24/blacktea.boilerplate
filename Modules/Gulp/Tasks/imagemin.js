import configManager from 'blacktea.configmanager';
import _ from 'lodash';
import path from 'path';
var responsive = require('gulp-responsive');
var responsiveConfig = require('gulp-responsive-config');

module.exports = function(framework) {
	var appPath = configManager.get("common", "appPath");
	var sourcePath = path.resolve(appPath, "src/img/*");
    var destinationPath = path.resolve(appPath, "dist/img");
	return {
		run: function(config, gulp, plugins) {
			return function() {

				var config = responsiveConfig([
					'Apps/src/scss/**/*.scss',
					'Apps/src/html/**/*.html'
				]);

				return gulp.src(sourcePath)					
					.pipe(responsive(config, {
						errorOnEnlargement: false,
						quality: 80,
						withMetadata: false,
						compressionLevel: 7,
						//max: true,
						errorOnUnusedConfig: false,
						errorOnUnusedImage: false,
						passThroughUnused: true
						}))
                    .pipe(gulp.dest(destinationPath));
			}
		}
	};
}
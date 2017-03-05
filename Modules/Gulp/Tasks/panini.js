import configManager from 'blacktea.configmanager';
import _ from 'lodash';
import path from 'path';
import panini from 'panini';

module.exports = function(framework) {

	var pubSub = framework.require("Common.Events");

	var paths = configManager.get("Gulp/panini", "/paths");
	var rootPath = path.resolve(
		configManager.get("common", "/rootPath"),
		paths.root
	);

	var destinationPath = path.resolve(
		configManager.get("common", "/rootPath"),
		configManager.get("Gulp/panini", "/destination")
	);

	return {
		run: function(config, gulp, plugins) {
			return function(done) {
				panini.refresh();
				var stream = gulp.src(path.resolve(rootPath, "**", "*.{html,hbs,handlebars}"))
					.pipe(panini(paths))
					.pipe(gulp.dest(destinationPath));
				stream.on('end', function() {
					pubSub.default.publish("triggerReload");
					//done();
				});
				stream.on('error', function(err) {
					//done(err);
				});
				return stream;
			}
		}
	};
}
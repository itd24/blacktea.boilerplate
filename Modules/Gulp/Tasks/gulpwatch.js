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
				if(!config.tasks)
					return;
				_.each(config.tasks,function(task){
					var taskArray = task.tasks;

					if(!Array.isArray(taskArray))
						taskArray = [taskArray];
					gulp.watch(task.path,taskArray);
				});					
			}
		}
	};
}
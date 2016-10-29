/**
 * the gulpfile. It loads the subtasks via an utility function
 */
'use strict';

var gulp = require('gulp');
var _ = require("lodash");
var plugins = require("gulp-load-plugins");
var framework = require("./Core/Main");
var configmanager = require("blacktea.configmanager");

require("blacktea.ns").root(".");

framework.modules.require("Gulp.ConfigUtilities").setCommonConfiguration();
var tasks = configmanager.getOrDefault("Gulp/tasks","/tasks",{});
var usedTasks = configmanager.getOrDefault("Gulp/tasks","/used",[]);
var defaultTasks = configmanager.getOrDefault("Gulp/tasks","/main",[]);
if(!_.isArray(defaultTasks))
    defaultTasks = [defaultTasks];
var resolved = framework.modules.require("Gulp.ConfigUtilities").loadTasks(tasks,usedTasks,framework);
_.forEach(resolved, function(task, key) {
	gulp.task(task.name, task.dependencies, task.module.run(task.args, gulp, plugins));
});

gulp.task("default", defaultTasks, function(){});
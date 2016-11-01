/**
 * the gulpfile. It loads the subtasks via an utility function
 */

import gulp from 'gulp';
import _ from 'lodash';
import plugins from 'gulp-load-plugins';
import framework from './Core/Main';
import configmanager from 'blacktea.configmanager';
import Ns from 'blacktea.ns'; 

Ns.root('.');

framework.modules.require("Gulp.ConfigUtilities").setCommonConfiguration();
var tasks = configmanager.getOrDefault("Gulp/tasks","/tasks",{}),
usedTasks = configmanager.getOrDefault("Gulp/tasks","/used",[]),
defaultTasks = configmanager.getOrDefault("Gulp/tasks","/main",[]);
if(!_.isArray(defaultTasks))
    defaultTasks = [defaultTasks];
var resolved = framework.modules.require("Gulp.ConfigUtilities").loadTasks(tasks,usedTasks,framework);
_.forEach(resolved, function(task, key) {
	gulp.task(task.name, task.dependencies, task.module.run(task.args, gulp, plugins));
});

gulp.task("default", defaultTasks, function(){});
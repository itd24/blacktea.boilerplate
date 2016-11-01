'use strict'

import moment from 'moment';
import _ from 'lodash';
import path from 'path';
import configManager from 'blacktea.configmanager';
import Exceptions from 'blacktea.exceptions';
import Ns from 'blacktea.ns';
import Framework from '../../Core/Main';

var privateFunctions = {
    /**
     * resolves the tasks
     * @param tasks the list of tasks
     * @param dependenciesToResolve, since this is a recursive function, we need to provide the dependencies, which to resolve
     * @param loadedTasks the tasks already evaluated
     * @dependencyTree the array we will keep the parents in. This way we can spot possible circular dependencies
     **/
    resolveTasks: function(tasks, dependenciesToResolve, loadedTasks, dependencyTree, framework) {
        var self = this;
        loadedTasks = loadedTasks || [];
        dependencyTree = dependencyTree || [];
        var resolvedTasks = [];
        _.each(dependenciesToResolve, function(dependency) {
            if (_.includes(loadedTasks, dependency))
                return;
            if (!tasks[dependency]) {
                throw new Exceptions.RuntimeException("missing dependencies: " + dependency);
            }
            if (_.findIndex(dependencyTree, function(o) {
                    return o == dependency
                }) > -1)
                throw new Exceptions.RuntimeException("Circular dependency: " + dependency);

            var task = tasks[dependency];
            var taskDependencies = task.dependencies || [];
            resolvedTasks = resolvedTasks.concat(self.resolveTasks(tasks, taskDependencies, loadedTasks, _.concat(dependencyTree, dependency)));
            var loadedModule = null;
            try {
                loadedModule = require(path.resolve(Ns.root(), "Modules", "Gulp", "Tasks", task.module))(framework);
            } catch (e) {
                try {
                    loadedModule = require(path.resolve(Ns.root(), "Modules", "Gulp", "Tasks", task.module, "main"))(framework);
                } catch (e2) {
                    throw new Exceptions.RuntimeException("Module " + task.module + " does not exist");
                }
            }
            resolvedTasks.push({
                "name": dependency,
                "dependencies": taskDependencies,
                "module": loadedModule,
                "args": task.args || []
            });
            loadedTasks.push(dependency);
        });
        return resolvedTasks;
    }
}

module.exports = {
    setCommonConfiguration: function() {
        var timestamp = moment().format('X');
        var dateTime = moment().format('DD.MM.YYYY HH:mm:ss');
        var root = Framework.require("Common.Utilities").root;
        configManager.merge("common", "/", {
            "timestamp": timestamp,
            "dateTime": dateTime,
            "rootPath": root
        });
    },
    loadTasks: function(tasks, used, framework) {
        return privateFunctions.resolveTasks(tasks, used, [], [], framework);
    }
}
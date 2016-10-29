var _ = require("lodash");
var Ns = require("blacktea.ns");
var Exceptions = require("blacktea.exceptions");
var glob = require("glob");
var path = require("path");

Ns.root("..");
Ns.addPath("core","Core");
Ns.addPath("modules","Modules");

var privateFunctions = {
    initModules:function(Framework){
        var moduleEntryPoints = glob.sync(path.resolve("..","Modules","*","Main.js"));
        _.each(moduleEntryPoints,function(entryPoint){
           var entryObject = require(entryPoint);
           entryObject.initialize(Framework);
        });
    }
}

module.exports = {
    require: function(namespace) {
        return Ns.core.require(namespace);
    },
    modules: {
        require: function(namespace) {
            return Ns.modules.require(namespace);
        }
    }
}

privateFunctions.initModules(module.exports);
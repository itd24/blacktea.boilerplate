var Debug = require('console-debug');

var console = new Debug({
	uncaughtExceptionCatch: false,      // Do we want to catch uncaughtExceptions? 
    consoleFilter: [/*'LOG', 'WARN'*/],     // Filter these console output types 
    logToFile: false,                    // if true, will put console output in a log file folder called 'logs' 
    //logFilter: ['LOG','DEBUG','INFO'],  // Examples: Filter these types to not log to file 
    colors: true                        // do we want pretty pony colors in our console output?
});

module.exports = {
	log:function(){
		for(var i=0;i<arguments.length;i++)
			console.log(arguments[i]);
	},
	warn:function(obj){
		for(var i=0;i<arguments.length;i++)
			console.warn(arguments[i]);
	},
	error:function(obj){
		for(var i=0;i<arguments.length;i++)
			console.error(arguments[i]);
	},
	debug:function(obj){
		for(var i=0;i<arguments.length;i++)
			console.debug(arguments[i]);
	},
	info:function(obj){
		for(var i=0;i<arguments.length;i++)
			console.info(arguments[i]);
	}
}
module.exports = function(framework) {

	var pubSub = framework.require("Common.Events");

	return {
		run: function(config, gulp, plugins) {
			return function() {
				pubSub.default.publish("triggerReload");
			}
		}
	};
}
import _ from 'lodash';
import path from 'path';
import Ns from 'blacktea.ns';

var root = Ns.root();

var privateMethods = {
	recursiveJoinPath(args) {
		_.each(args, function(value, key) {
			if (_.isArray(value)) {
				agrs[key] = this.recursiveJoinPath(args[key]);
			} else {
				args[key] = _.trim(value, ' /\\');
			}
		});
		return args.join(path.sep);
	}
};

module.exports = {
	root: root,
	copyKeysToArray: function(object, keys, array) {
		if (!object || !keys)
			return array;
		_.each(keys, function(key) {
			if (!!object[key])
				array.push(object[key]);
		});
		return array;
	},
	path: function() {
		var args = Array.prototype.slice.call(arguments);
		return privateMethods.recursiveJoinPath(args);
	},
	absPath: function() {
		return [root, this.path.apply(this, arguments)].join(path.sep);
	},
	absToRelative: function(absPath) {
		return absPath.replace(root, "");
	},
	relativeToAbs: function(relativePath) {
		return [_.trim(root, ' /\\'), _.trim(relativePath, ' /\\')].join(path.sep);
	}
}
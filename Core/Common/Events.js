import EventEmitter from 'events';
import util from 'util';
import configManager from 'blacktea.configmanager';
import exceptions from 'blacktea.exceptions';
import _ from 'lodash';

var privateFunctions = {
	getEvent: function(eventName) {
		var event = configManager.getOrDefault("events", eventName, null);
		return event;
	}
};

function PubSub() {
	EventEmitter.call(this);
	const that = this;

	that.publish = function(eventName) {
		var event = privateFunctions.getEvent(eventName);
		if (event == null) {
			throw new exceptions.InvalidArgumentException("The event does not exist");
		}
		return that.emit(event);
	}
	that.listen = function(eventName, callback) {
		var event = privateFunctions.getEvent(eventName);
		if (event == null) {
			throw new exceptions.InvalidArgumentException("The event does not exist");
		}
		return that.on(event, callback);
	}
}

util.inherits(PubSub, EventEmitter);

var defaultPubSub = new PubSub();

module.exports = {
	default: defaultPubSub,
	PubSub: PubSub
}
var plugin = require("steal-less");
var steal = require("@steal");
var loader = require("@loader");
var global = loader.global;
var StealLessManager = plugin.StealLessManager;

function extend(a, b) {
	for(var p in b) {
		a[p] = b[p];
	}
	return a;
}

extend(exports, plugin);

var loadFile = StealLessManager.prototype.loadFile;
StealLessManager.prototype.loadFile = function(filename,
											   currentDirectory,
											   options, environment,
											   callback){
	var srces = global.LESS_SOURCES || {};
	var src = srces[filename];
	if(src) {
		callback(null, {
			contents: src,
			filename: steal.joinURIs(currentDirectory, filename)
		});
		return;
	}

	return loadFile.apply(this, arguments);
};

exports.instantiate = function(load){
	return {
		deps: [],
		execute: function(){
			return loader.newModule({});
		}
	};
};

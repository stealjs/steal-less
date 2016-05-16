var steal = require("@steal");
var global = require("@loader").global;
global.LESS_SOURCES = {};

module.exports = function(loader){
	var oldFetch, oldLessLoad;
	var sources = {};

	var overrideFetch = function() {
		oldFetch = loader.fetch;
		loader.fetch = function(load){
			if(sources[load.name]) {
				return Promise.resolve(sources[load.name]);
			}
			return oldFetch.apply(this, arguments);
		};
		overrideFetch = function(){};
	};

	return {
		mock: function(){
			return Promise.resolve();;
		},
		provide: function(name, source){
			overrideFetch();
			sources[name] = source;
		},
		provideLess: function(relPath, source){
			global.LESS_SOURCES[relPath] = source;
		},
		restore: function(){
			if(oldFetch) {
				loader.fetch = oldFetch;
			}
			sources = {};
			global.LESS_SOURCES = {};
		}
	};
};

var loader = require("@loader");
var helpers = require("./helpers")(loader);
var QUnit = require("steal-qunit");

QUnit.module("live-reload with deeply nested modules", {
	setup: function(assert){
		var done = assert.async();
		helpers.mock().then(done, done);
	},
	teardown: function(){
		helpers.restore();
	}
});

QUnit.test("dependencies are in the includedModules", function(assert){
	var done = assert.async();

	helpers.provide("foo.less!$less", "@import './bar.less';");
	helpers.provideLess("./bar.less", "@import './baz.less';");
	helpers.provideLess("./baz.less", "body { background: green; }");

	loader.import("foo.less")
	.then(function(){
		var load = loader.getModuleLoad("foo.less!$less");
		var deps = load.metadata.includedDeps;

		assert.ok(Array.isArray(deps), "got an array of deps");
		assert.equal(deps.length, 2, "there are two nested deps");
		assert.ok(/bar.less/.test(deps[0]), "first is bar.less");
		assert.ok(/baz.less/.test(deps[1]), "second is baz.less");

		done();
	}, function(err){
		assert.ok(!err, err && err.stack);
		done(err);
	});
});

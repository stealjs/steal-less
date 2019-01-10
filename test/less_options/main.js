if (typeof window !== "undefined" && window.assert) {
	var systemInstantiate = System.instantiate;

	System.instantiate = function(load) {
		if (load.name.indexOf("main.less") !== -1) {
			var hasLineNumber = load.source.indexOf("line 1") !== -1,
				hasStrictMath = load.source.indexOf("100%") !== -1,
				hasPlugin = load.source.indexOf("/* steal-plugin-test */") !== -1;

			assert.ok(hasLineNumber, "less set to dump line numbers");
			assert.ok(hasStrictMath, "less set to process only maths inside un-necessary parenthesis");
			assert.ok(hasPlugin, "less set to apply plugins");
			done();
		}
		return systemInstantiate.apply(this, arguments);
	};

	steal("less_options/main.less");
}

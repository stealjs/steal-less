System.config({
	lessOptions: {
		strictMath: true, // default false
		dumpLineNumbers: "comments" // default false
	},
	ext: {
		less: "steal-less"
	},
	paths: {
		"bootstrap/*": "less_tilde/libs/bootstrap/*",
		"img-pack/*": "less_tilde/libs/img-pack/*",
		"steal-css": "../node_modules/steal-css/css.js",
		"steal-less": "../less.js"
	}
});

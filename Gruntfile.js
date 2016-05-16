
module.exports = function(grunt){

	grunt.initConfig({
		testee: {
			options: {
				browsers: ["firefox"]
			},
			all: ["test/test.html", "test/unit.html"]
		}
	});

	grunt.loadNpmTasks("testee");
	grunt.registerTask("test", ["testee:all"]);
};

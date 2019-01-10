import "less_tilde/module_a.less!";

var testImage = function(selector, cb){
	var image = new Image();
	image.onload = function(){
		cb();
	};
	image.onerror = function(){
		cb(selector);
		assert.ok(false, "image not loaded");
		done();
	};
	image.src = $(selector).css("background-image").replace(/url\("?/,"").replace(/"?\)/,"");
};

if (window.assert) {
	assert.equal( $("#test-element").width(), 20, 'applied mixin-b');
	assert.equal( $("#test-element").height(), 20, 'applied mixin-c' );
	assert.equal( $('#test-element-4').width(), 1337, 'locate://\'ed resource from importer whose path includes "../"');

	testImage("#test-element", function(err){
		if(err){
			assert.ok(false, err);
			done();
		} else {
			assert.ok(true, "#test-relative");
			testImage("#test-element-2", function(err){
				if(err){
					assert.ok(false, err);
					done();
				} else {
					assert.ok(true, "#test-element-2, variable strings with locate://");
					testImage("#test-element-3", function(err){
						if(err){
							assert.ok(false, err + ' background image didn\'t load');
							done();
						} else {
							assert.ok(true, "#test-element-3, imported variable strings with locate://");
						}

						done();
					});
				}
			});
		}
		
	});
} else {
	console.log( $("#test-element").width() );
	console.log( $("#test-element").css("background-image") );
	console.log( $("#test-element-2").css("background-image") );
}



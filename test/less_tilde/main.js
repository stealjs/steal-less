import "less_tilde/module_a.less!";


var testImage = function(selector, cb){
	var image = new Image();
	image.onload = function(){
		cb();
	};
	image.onerror = function(){
		cb(selector);
		QUnit.ok(false, "image not loaded");
		removeMyself();
	};
	image.src = $(selector).css("background-image").replace(/url\("?/,"").replace(/"?\)/,"");
};


if(window.QUnit) {
	QUnit.ok( $("#test-element").width(), 20);
	QUnit.ok( $("#test-element").css('color'), 'goldenrod');
	testImage("#test-element", function(err){
		if(err){
			QUnit.ok(false, err);
			QUnit.start();
			removeMyself();
		} else {
			QUnit.ok(true, "#test-relative");
			testImage("#test-element-2", function(err){
				if(err){
					QUnit.ok(false, err);
					QUnit.start();
					removeMyself();
				} else {
					QUnit.ok(true, "#test-element-2, variable strings with locate://");
					testImage("#test-element-3", function(err){
						if(err){
							QUnit.ok(false, err + ' background image didn\'t load');
							removeMyself();
						} else {
							QUnit.ok(true, "#test-element-3, imported variable strings with locate://");
						}

						QUnit.start();
						removeMyself();
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



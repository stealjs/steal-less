
function makeIframe(src, assert) {
	var done = assert.async();
	var iframe = document.createElement("iframe");

	window.assert = assert;
	window.done = function() {
		done();
		document.body.removeChild(iframe);
	};

	document.body.appendChild(iframe);
	iframe.src = src;
}

QUnit.module("steal-less plugin");

QUnit.test("set options to less plugin", function(assert) {
	makeIframe("less_options/site.html", assert);
});

QUnit.test("less loads in the right spot", function(assert) {
	makeIframe("less_imports/dev.html", assert);
});

QUnit.test("less loads imports that include locate:// paths", function(assert) {
	makeIframe("less_tilde/dev.html", assert);
});

QUnit.test("Get good error messages on 404s", function(assert) {
	makeIframe("less_error/dev.html", assert);
});

QUnit.start();

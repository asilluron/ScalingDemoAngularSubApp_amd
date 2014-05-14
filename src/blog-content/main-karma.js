//Auto-Generated, DO NOT EDIT
(function () {
        "use strict";

        var tests = [];
        for (var file in window.__karma__.files) {
            if (window.__karma__.files.hasOwnProperty(file)) {
                if (/^\/base\/spec\//i.test(file) && /Spec\.js$/.test(file)) {
                    tests.push(file);
                }
            }
        }

        var require_config =
{"baseUrl":"/base/src","deps":["angular","angular-mocks"],"paths":{"angular":"vendor/angular/angular","angular-mocks":"vendor/angular-mocks/angular-mocks"},"shim":{"angular-mocks":["angular"]}}
;

require_config["callback"] = function () {
	requirejs(["blog-content/app"], function () {
		Object.prototype["@" + Math.random()] = null;
		requirejs(tests, function () {
			window.__karma__.start();
		});
	});
};

requirejs.config(require_config);
}());
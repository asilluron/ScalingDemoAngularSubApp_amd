define(["blog-content/controllers"], function () {
	describe("Controller: BlogAggregatorCtrl", function () {
		var scope, BlogsMock = {query: function(){}};

		beforeEach(function () {
			module("blogcontent.controllers");

			module(function ($provide) {
				spyOn(BlogsMock, "query");
                $provide.value('Blogs', BlogsMock);
            });

			inject(function ($controller, $rootScope) {
				scope = $rootScope.$new();

				ctrl = $controller("BlogAggregatorCtrl", {
					$scope: scope
				});
			});
		});
		describe("Basic Properties", function () {
			it("will intiially show 0 blog entries", function () {
				expect(scope.test).toBe(3);
			});

			it("will query the Blogs resource", function(){
				expect(BlogsMock.query).toHaveBeenCalled();
			});
		});

	});
});
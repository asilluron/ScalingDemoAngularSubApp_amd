define([], function () {
	function BlogAggregatorCtrl($scope, Blogs) {
		$scope.Blogs = Blogs.query();
		$scope.test = 3;
	}

	return ["$scope", "Blogs", BlogAggregatorCtrl];
});
adminModule
	.controller('mainContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Main Content Initialized';
	}]);
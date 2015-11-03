adminModule
	.controller('headsetContentController', ['$scope', 'Headset', function($scope, Headset){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Headset Content Initialized';
	}]);
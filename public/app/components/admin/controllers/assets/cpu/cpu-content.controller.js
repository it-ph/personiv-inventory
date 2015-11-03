adminModule
	.controller('cpuContentController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'CPU Content Initialized';

		console.log('ok');
	}]);
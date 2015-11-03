adminModule
	.controller('keyboardContentController', ['$scope', 'Keyboard', function($scope, Keyboard){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Keyboard Content Initialized';
	}]);
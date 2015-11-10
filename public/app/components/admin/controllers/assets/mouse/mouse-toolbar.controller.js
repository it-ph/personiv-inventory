adminModule
	.controller('mouseToolbarController', ['$scope', '$stateParams', 'Mouse', function($scope, $stateParams, Mouse){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Assets';
		$scope.toolbar.childState = 'Mouse';
	}]);
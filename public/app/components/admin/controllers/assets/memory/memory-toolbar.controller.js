adminModule
	.controller('memoryToolbarController', ['$scope', '$stateParams', 'Memory', function($scope, $stateParams, Memory){
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
		$scope.toolbar.childState = 'Memory';
	}]);
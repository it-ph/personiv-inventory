adminModule
	.controller('monitorToolbarController', ['$scope', '$stateParams', 'Monitor', function($scope, $stateParams, Monitor){
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
		$scope.toolbar.childState = 'Monitor';
	}]);
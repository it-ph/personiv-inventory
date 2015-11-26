adminModule
	.controller('projectorToolbarController', ['$scope', 'Projector', function($scope, Projector){
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
		$scope.toolbar.childState = 'Projector';
	}]);
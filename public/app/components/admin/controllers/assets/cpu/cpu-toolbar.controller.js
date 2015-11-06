adminModule
	.controller('cpuToolbarController', ['$scope', 'Desktop', function($scope, Desktop){
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
		$scope.toolbar.childState = 'CPU';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);
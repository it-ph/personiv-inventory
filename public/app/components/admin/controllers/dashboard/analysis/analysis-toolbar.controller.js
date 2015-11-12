adminModule
	.controller('analysisToolbarController', ['$scope', function($scope){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Dashboard';
		$scope.toolbar.childState = 'Analysis';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
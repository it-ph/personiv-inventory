adminModule
	.controller('hardDiskToolbarController', ['$scope', '$state', function($scope, $state){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Assets';
		$scope.toolbar.childState = 'Hard Disk';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
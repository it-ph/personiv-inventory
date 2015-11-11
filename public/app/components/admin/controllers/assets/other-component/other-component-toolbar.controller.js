adminModule
	.controller('otherComponentToolbarController', ['$scope', '$stateParams', 'OtherComponent', function($scope, $stateParams, OtherComponent){
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
		$scope.toolbar.childState = 'Other Component';
	}]);
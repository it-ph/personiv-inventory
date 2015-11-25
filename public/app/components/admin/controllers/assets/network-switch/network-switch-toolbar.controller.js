adminModule
	.controller('networkSwitchToolbarController', ['$scope', 'NetworkSwitch', function($scope, NetworkSwitch){
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
		$scope.toolbar.childState = 'Network Switch';
	}]);
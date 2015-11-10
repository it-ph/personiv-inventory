adminModule
	.controller('scannerToolbarController', ['$scope', '$stateParams', 'Scanner', function($scope, $stateParams, Scanner){
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
		$scope.toolbar.childState = 'Scanner';
	}]);
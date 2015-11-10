adminModule
	.controller('printerToolbarController', ['$scope', '$stateParams', 'Printer', function($scope, $stateParams, Printer){
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
		$scope.toolbar.childState = 'Printer';
	}]);
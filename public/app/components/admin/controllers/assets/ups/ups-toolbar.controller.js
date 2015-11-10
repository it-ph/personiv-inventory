adminModule
	.controller('upsToolbarController', ['$scope', '$stateParams', 'UPS', function($scope, $stateParams, UPS){
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
		$scope.toolbar.childState = 'UPS';
	}]);
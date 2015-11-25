adminModule
	.controller('telephoneToolbarController', ['$scope', 'Telephone', function($scope, Telephone){
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
		$scope.toolbar.childState = 'Telephone';
	}]);
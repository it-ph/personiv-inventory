adminModule
	.controller('softwareToolbarController', ['$scope', '$stateParams', 'Software', function($scope, $stateParams, Software){
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
		$scope.toolbar.childState = 'Software';
	}]);